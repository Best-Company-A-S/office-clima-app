import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { deviceId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deviceId } = await params;

    const device = await prisma.device.findUnique({
      where: {
        device_id: deviceId,
      },
      include: {
        room: true,
      },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Add room name to response if available
    const deviceWithRoomName = {
      ...device,
      roomName: device.room?.name || null,
    };

    return NextResponse.json(deviceWithRoomName);
  } catch (error) {
    console.error("Error fetching device:", error);
    return NextResponse.json(
      { error: "Failed to fetch device" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { deviceId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deviceId } = await params;
    const data = await request.json();

    const device = await prisma.device.findUnique({
      where: {
        device_id: deviceId,
      },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Update the device
    const updatedDevice = await prisma.device.update({
      where: {
        device_id: deviceId,
      },
      data,
    });

    return NextResponse.json(updatedDevice);
  } catch (error) {
    console.error("Error updating device:", error);
    return NextResponse.json(
      { error: "Failed to update device" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { deviceId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deviceId } = await params;

    // Check if device exists
    const device = await prisma.device.findUnique({
      where: {
        device_id: deviceId,
      },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Delete device readings first (cascade should handle this, but being explicit)
    await prisma.deviceReading.deleteMany({
      where: {
        deviceId: deviceId,
      },
    });

    // Delete any firmware downloads associated with this device
    await prisma.firmwareDownload.deleteMany({
      where: {
        deviceId: deviceId,
      },
    });

    // Finally delete the device
    await prisma.device.delete({
      where: {
        device_id: deviceId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Device deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json(
      { error: "Failed to delete device" },
      { status: 500 }
    );
  }
}
