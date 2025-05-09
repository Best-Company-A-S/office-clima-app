import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for device readings
const createReadingSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required"),
  temperature: z.number().min(-50).max(100),
  humidity: z.number().min(0).max(100),
  batteryVoltage: z.number().min(0).max(15).optional(),
  batteryPercentage: z.number().min(0).max(100).optional(),
  batteryTimeRemaining: z.number().min(0).optional(),
  timestamp: z.number().transform((val) => new Date(val * 1000)), // Convert UNIX timestamp to Date
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Device reading received:", body);

    // Validate request body
    const validation = createReadingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    const {
      deviceId,
      temperature,
      humidity,
      batteryVoltage,
      batteryPercentage,
      batteryTimeRemaining,
      timestamp,
    } = validation.data;

    // Check if device exists
    let device = await prisma.device.findUnique({
      where: { device_id: deviceId },
    });

    // Auto-register the device if it doesn't exist
    if (!device) {
      console.log(`Auto-registering new device: ${deviceId}`);
      try {
        device = await prisma.device.create({
          data: {
            device_id: deviceId,
            firmwareStatus: "UP_TO_DATE",
            lastSeenAt: new Date(),
          },
        });
        console.log(`Successfully registered device: ${deviceId}`);
      } catch (error) {
        console.error(`Failed to auto-register device: ${deviceId}`, error);
        return NextResponse.json(
          { error: `Failed to register device: ${deviceId}` },
          { status: 500 }
        );
      }
    }

    // Create the reading
    const reading = await prisma.$executeRaw`
      INSERT INTO "DeviceReading" ("id", "deviceId", "temperature", "humidity", "batteryVoltage", "batteryPercentage", "batteryTimeRemaining", "timestamp", "createdAt")
      VALUES (gen_random_uuid(), ${deviceId}, ${temperature}, ${humidity}, ${
      batteryVoltage || null
    }, ${batteryPercentage || null}, ${
      batteryTimeRemaining || null
    }, ${timestamp}, NOW())
      RETURNING *
    `;

    // Update the device lastSeenAt time and battery info
    await prisma.device.update({
      where: { device_id: deviceId },
      data: {
        lastSeenAt: new Date(),
        ...(batteryVoltage && { batteryVoltage }),
        ...(batteryPercentage && { batteryPercentage }),
        ...(batteryTimeRemaining && { batteryTimeRemaining }),
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[DEVICE_READING_CREATE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const deviceId = searchParams.get("deviceId");
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 100;
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const from = searchParams.get("from")
      ? new Date(searchParams.get("from")!)
      : undefined;
    const to = searchParams.get("to")
      ? new Date(searchParams.get("to")!)
      : undefined;

    const skip = (page - 1) * limit;

    let query = `
      SELECT * FROM "DeviceReading"
      WHERE 1=1
    `;

    const queryParams: any[] = [];
    let paramCounter = 1;

    if (deviceId) {
      query += ` AND "deviceId" = $${paramCounter++}`;
      queryParams.push(deviceId);
    }

    if (from) {
      query += ` AND "timestamp" >= $${paramCounter++}`;
      queryParams.push(from);
    }

    if (to) {
      query += ` AND "timestamp" <= $${paramCounter++}`;
      queryParams.push(to);
    }

    // Count query
    const countQuery = `SELECT COUNT(*) FROM (${query}) as count_query`;
    const countResult = await prisma.$queryRawUnsafe(
      countQuery,
      ...queryParams
    );
    const totalCount = parseInt((countResult as { count: string }[])[0].count);

    // Data query with pagination
    query += ` ORDER BY "timestamp" DESC LIMIT $${paramCounter++} OFFSET $${paramCounter++}`;
    queryParams.push(limit, skip);

    const readings = await prisma.$queryRawUnsafe(query, ...queryParams);

    return NextResponse.json({
      data: readings,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("[DEVICE_READING_LIST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
