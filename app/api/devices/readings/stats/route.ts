import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to convert BigInt values to numbers for JSON serialization
function convertBigIntsToNumbers(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "bigint") {
    return Number(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBigIntsToNumbers);
  }

  if (typeof obj === "object") {
    // Handle date objects for proper serialization
    if (obj instanceof Date) {
      return obj.toISOString();
    }

    const result: Record<string, any> = {};
    for (const key in obj) {
      result[key] = convertBigIntsToNumbers(obj[key]);
    }
    return result;
  }

  return obj;
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const deviceId = searchParams.get("deviceId");
    const roomId = searchParams.get("roomId");
    const period = searchParams.get("period") || "day"; // minute, hour, day, week, month, year
    const from = searchParams.get("from")
      ? new Date(searchParams.get("from")!)
      : undefined;
    const to = searchParams.get("to")
      ? new Date(searchParams.get("to")!)
      : undefined;

    // Calculate default date range if not provided
    const now = new Date();
    let startDate = from;
    let endDate = to || now;

    if (!startDate) {
      switch (period) {
        case "minute":
          startDate = new Date(now);
          startDate.setMinutes(now.getMinutes() - 60);
          break;
        case "hour":
          startDate = new Date(now);
          startDate.setHours(now.getHours() - 24);
          break;
        case "day":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 1);
          break;
        case "week":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          startDate = new Date(now);
          startDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          startDate = new Date(now);
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 1);
      }
    }

    // Determine the grouping interval based on the period
    let groupByInterval;
    let limit = 60; // Default limit for data points

    switch (period) {
      case "minute":
        groupByInterval = "minute";
        limit = 60; // Last 60 minutes
        break;
      case "hour":
        groupByInterval = "minute";
        limit = 60; // Show 60 minute intervals for the last 24 hours
        break;
      case "day":
        groupByInterval = "hour";
        limit = 24; // Show 24 hours for a day
        break;
      case "week":
        groupByInterval = "day";
        limit = 7; // Show 7 days for a week
        break;
      case "month":
        groupByInterval = "day";
        limit = 31; // Show up to 31 days for a month
        break;
      case "year":
        groupByInterval = "month";
        limit = 12; // Show 12 months for a year
        break;
      default:
        groupByInterval = "hour";
        limit = 24;
    }

    let query;
    let params: any[] = [startDate, endDate];

    if (deviceId) {
      // For a specific device
      query = `
        SELECT 
          AVG(temperature) as avg_temperature,
          MAX(temperature) as max_temperature,
          MIN(temperature) as min_temperature,
          AVG(humidity) as avg_humidity,
          MAX(humidity) as max_humidity,
          MIN(humidity) as min_humidity,
          COUNT(*) as reading_count,
          date_trunc('${groupByInterval}', timestamp) as hour
        FROM "DeviceReading"
        WHERE "deviceId" = $3
        AND timestamp BETWEEN $1 AND $2
        GROUP BY hour
        ORDER BY hour ASC
        LIMIT ${limit}
      `;
      params.push(deviceId);
    } else if (roomId) {
      // For all devices in a room
      const userId = parseInt(session.user.id);

      // First check if user has access to this room
      const room = await prisma.$queryRaw`
        SELECT r.*, t.id as team_id
        FROM "Room" r
        JOIN "Team" t ON r."teamId" = t.id
        LEFT JOIN "TeamMember" tm ON t.id = tm."teamId" AND tm."userId" = ${userId}
        WHERE r.id = ${roomId}
        AND (t."ownerId" = ${userId} OR tm.id IS NOT NULL)
      `;

      if (!room || !Array.isArray(room) || room.length === 0) {
        return NextResponse.json(
          { error: "Room not found or access denied" },
          { status: 403 }
        );
      }

      query = `
        SELECT 
          AVG(dr.temperature) as avg_temperature,
          MAX(dr.temperature) as max_temperature,
          MIN(dr.temperature) as min_temperature,
          AVG(dr.humidity) as avg_humidity,
          MAX(dr.humidity) as max_humidity,
          MIN(dr.humidity) as min_humidity,
          COUNT(*) as reading_count,
          date_trunc('${groupByInterval}', dr.timestamp) as hour
        FROM "DeviceReading" dr
        JOIN "Device" d ON dr."deviceId" = d.device_id
        WHERE d."roomId" = $3
        AND dr.timestamp BETWEEN $1 AND $2
        GROUP BY hour
        ORDER BY hour ASC
        LIMIT ${limit}
      `;
      params.push(roomId);
    } else {
      // Return error if neither deviceId nor roomId is provided
      return NextResponse.json(
        { error: "Either deviceId or roomId is required" },
        { status: 400 }
      );
    }

    // Execute the query and process results
    let rawStats = await prisma.$queryRawUnsafe(query, ...params);

    // Debug log
    console.log(
      "Raw stats first item:",
      rawStats && Array.isArray(rawStats) && rawStats.length > 0
        ? rawStats[0]
        : "No data"
    );

    // Process the data to ensure proper date handling
    const processedStats = Array.isArray(rawStats)
      ? rawStats.map((item) => ({
          ...item,
          hour: item.hour instanceof Date ? item.hour.toISOString() : item.hour,
        }))
      : [];

    const stats = convertBigIntsToNumbers(processedStats);

    // Also get overall statistics
    let overallQuery;
    if (deviceId) {
      overallQuery = `
        SELECT 
          AVG(temperature) as avg_temperature,
          MAX(temperature) as max_temperature,
          MIN(temperature) as min_temperature,
          AVG(humidity) as avg_humidity,
          MAX(humidity) as max_humidity,
          MIN(humidity) as min_humidity,
          COUNT(*) as reading_count
        FROM "DeviceReading"
        WHERE "deviceId" = $3
        AND timestamp BETWEEN $1 AND $2
      `;
    } else {
      overallQuery = `
        SELECT 
          AVG(dr.temperature) as avg_temperature,
          MAX(dr.temperature) as max_temperature,
          MIN(dr.temperature) as min_temperature,
          AVG(dr.humidity) as avg_humidity,
          MAX(dr.humidity) as max_humidity,
          MIN(dr.humidity) as min_humidity,
          COUNT(*) as reading_count
        FROM "DeviceReading" dr
        JOIN "Device" d ON dr."deviceId" = d.device_id
        WHERE d."roomId" = $3
        AND dr.timestamp BETWEEN $1 AND $2
      `;
    }

    const rawOverallStats = await prisma.$queryRawUnsafe(
      overallQuery,
      ...params
    );
    const overallStats = convertBigIntsToNumbers(rawOverallStats);

    // For debugging - verify the number of readings vs data points
    console.log(
      `Total readings: ${overallStats[0]?.reading_count || 0}, Data points: ${
        stats.length
      }`
    );

    return NextResponse.json({
      timeSeriesData: stats,
      overallStats: overallStats[0],
      period,
      startDate,
      endDate,
    });
  } catch (error) {
    console.error("[DEVICE_READING_STATS]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
