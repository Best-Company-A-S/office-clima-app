import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { deviceId: string } }
) {
  try {
    const { deviceId } = params;

    if (!deviceId) {
      return NextResponse.json(
        { error: "Device ID is required" },
        { status: 400 }
      );
    }

    // Find the device with room details
    const device = await prisma.device.findUnique({
      where: { device_id: deviceId },
      include: {
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Format the response with room name
    const response = {
      ...device,
      roomName: device.room?.name || null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching device:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { deviceId: string } }
) {
  try {
    const { deviceId } = params;
    const body = await request.json();

    // Validate request
    if (!deviceId) {
      return NextResponse.json(
        { error: "Device ID is required" },
        { status: 400 }
      );
    }

    // Check if device exists
    const device = await prisma.device.findUnique({
      where: { device_id: deviceId },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Fields that are allowed to be updated
    const allowedFields: Record<string, any> = {
      name: body.name,
      description: body.description,
      autoUpdate: body.autoUpdate,
      roomId: body.roomId,
    };

    // Remove undefined fields
    Object.keys(allowedFields).forEach((key) => {
      if (allowedFields[key] === undefined) {
        delete allowedFields[key];
      }
    });

    // Update device
    const updatedDevice = await prisma.device.update({
      where: { device_id: deviceId },
      data: allowedFields,
      include: {
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Format the response
    const response = {
      ...updatedDevice,
      roomName: updatedDevice.room?.name || null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating device:", error);
    return NextResponse.json(
      { error: "Failed to update device" },
      { status: 500 }
    );
  }
}
