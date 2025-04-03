import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for device pairing
const pairDeviceSchema = z.object({
  device_id: z.string().min(1, "Device ID is required"),
  name: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  roomId: z.string().uuid("Invalid room ID").optional(),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate request body
    const validation = pairDeviceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    const { device_id, name, description, roomId } = validation.data;

    // Check if device exists
    const existingDevice = await prisma.device.findUnique({
      where: { device_id },
    });

    if (!existingDevice) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // If roomId is provided, check if user has access to that room
    if (roomId) {
      const room = await prisma.room.findUnique({
        where: { id: roomId },
        include: {
          team: {
            include: {
              members: {
                where: { userId: session.user.id as string },
              },
            },
          },
        },
      });

      if (!room) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }

      const isOwner = room.team.ownerId === (session.user.id as string);
      const isMember = room.team.members.length > 0;

      if (!isOwner && !isMember) {
        return NextResponse.json(
          { error: "Unauthorized to assign device to this room" },
          { status: 403 }
        );
      }
    }

    // Update the device with pairing information
    const updatedDevice = await prisma.device.update({
      where: { device_id },
      data: {
        name,
        description,
        roomId,
        isPaired: true,
        pairedAt: new Date(),
      },
    });

    return NextResponse.json(updatedDevice);
  } catch (error) {
    console.error("Error pairing device:", error);
    return NextResponse.json(
      { error: "Failed to pair device" },
      { status: 500 }
    );
  }
}

// For getting available devices to pair
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get unpaired devices
    const devices = await prisma.device.findMany({
      where: {
        isPaired: false,
      },
    });

    return NextResponse.json(devices);
  } catch (error) {
    console.error("Error fetching available devices:", error);
    return NextResponse.json(
      { error: "Failed to fetch available devices" },
      { status: 500 }
    );
  }
}
