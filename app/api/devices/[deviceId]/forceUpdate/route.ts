import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { deviceId: string } }
) {
  try {
    const { deviceId } = await params;

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

    // Find latest released firmware for this device model
    const latestFirmware = await prisma.firmware.findFirst({
      where: {
        modelType: device.model || "Arduino_UNO_R4_WiFi", // Default to Arduino if no model specified
        status: "RELEASED",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestFirmware) {
      return NextResponse.json(
        { error: "No firmware available for this device model" },
        { status: 404 }
      );
    }

    // Update device status to indicate pending update
    await prisma.device.update({
      where: { device_id: deviceId },
      data: {
        firmwareStatus: "UPDATE_PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Update initiated. The device will update on next check-in.",
      firmwareVersion: latestFirmware.version,
    });
  } catch (error) {
    console.error("Error forcing device update:", error);
    return NextResponse.json(
      { error: "Failed to initiate update" },
      { status: 500 }
    );
  }
}
