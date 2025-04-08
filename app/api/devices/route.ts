import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");
  const teamId = searchParams.get("teamId");

  if (!roomId && !teamId) {
    return NextResponse.json(
      { error: "Either roomId or teamId is required" },
      { status: 400 }
    );
  }

  try {
    const userId = parseInt(session.user.id);

    if (roomId) {
      // First, check if user has access to this room
      const room = await prisma.room.findUnique({
        where: { id: roomId },
        include: {
          team: {
            include: {
              members: {
                where: { userId },
              },
            },
          },
        },
      });

      if (!room) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }

      const isOwner = room.team.ownerId === userId;
      const isMember = room.team.members.length > 0;

      if (!isOwner && !isMember) {
        return NextResponse.json(
          { error: "Unauthorized access to room" },
          { status: 403 }
        );
      }

      // Fetch devices for this room
      const devices = await prisma.device.findMany({
        where: { roomId },
        orderBy: { lastSeenAt: "desc" },
      });

      // Fetch the latest reading for each device
      const enhancedDevices = await Promise.all(
        devices.map(async (device) => {
          const latestReading = await prisma.$queryRaw`
            SELECT temperature, humidity, timestamp, "createdAt"
            FROM "DeviceReading"
            WHERE "deviceId" = ${device.device_id}
            ORDER BY timestamp DESC
            LIMIT 1
          `;

          return {
            ...device,
            lastReading:
              latestReading &&
              Array.isArray(latestReading) &&
              latestReading.length > 0
                ? {
                    temperature: parseFloat(latestReading[0].temperature),
                    humidity: parseFloat(latestReading[0].humidity),
                    airQuality: Math.floor(Math.random() * 100), // Mock airQuality
                    timestamp: latestReading[0].timestamp,
                  }
                : undefined,
          };
        })
      );

      return NextResponse.json(enhancedDevices);
    }

    if (teamId) {
      // Check if user has access to this team
      const team = await prisma.team.findUnique({
        where: { id: teamId },
        include: {
          members: {
            where: { userId },
          },
        },
      });

      if (!team) {
        return NextResponse.json({ error: "Team not found" }, { status: 404 });
      }

      const isOwner = team.ownerId === userId;
      const isMember = team.members.length > 0;

      if (!isOwner && !isMember) {
        return NextResponse.json(
          { error: "Unauthorized access to team" },
          { status: 403 }
        );
      }

      // Get all rooms for this team
      const rooms = await prisma.room.findMany({
        where: { teamId },
        select: { id: true },
      });

      const roomIds = rooms.map((room) => room.id);

      // Fetch devices for all rooms in this team
      const devices = await prisma.device.findMany({
        where: {
          OR: [
            { roomId: { in: roomIds } },
            { roomId: null, isPaired: true }, // Include devices not assigned to any room but paired
          ],
        },
        orderBy: { lastSeenAt: "desc" },
      });

      // Fetch the latest reading for each device
      const enhancedDevices = await Promise.all(
        devices.map(async (device) => {
          const latestReading = await prisma.$queryRaw`
            SELECT temperature, humidity, timestamp, "createdAt"
            FROM "DeviceReading"
            WHERE "deviceId" = ${device.device_id}
            ORDER BY timestamp DESC
            LIMIT 1
          `;

          return {
            ...device,
            lastReading:
              latestReading &&
              Array.isArray(latestReading) &&
              latestReading.length > 0
                ? {
                    temperature: parseFloat(latestReading[0].temperature),
                    humidity: parseFloat(latestReading[0].humidity),
                    airQuality: Math.floor(Math.random() * 100), // Mock airQuality
                    timestamp: latestReading[0].timestamp,
                  }
                : undefined,
          };
        })
      );

      return NextResponse.json(enhancedDevices);
    }
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.json(
      { error: "Failed to fetch devices" },
      { status: 500 }
    );
  }
}
