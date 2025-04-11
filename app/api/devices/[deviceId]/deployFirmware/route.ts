import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { deviceId: string } }
) {
  try {
    const { deviceId } = await params;
    const body = await request.json();
    const { firmwareId } = body;

    if (!deviceId || !firmwareId) {
      return NextResponse.json(
        { error: "Device ID and Firmware ID are required" },
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

    // Check if firmware exists
    const firmware = await prisma.firmware.findUnique({
      where: { id: firmwareId },
    });

    if (!firmware) {
      return NextResponse.json(
        { error: "Firmware not found" },
        { status: 404 }
      );
    }

    // Update firmware status if it's a draft
    if (firmware.status === "DRAFT") {
      await prisma.firmware.update({
        where: { id: firmwareId },
        data: { status: "RELEASED" },
      });
    }

    // Update device status to indicate pending update
    await prisma.device.update({
      where: { device_id: deviceId },
      data: {
        firmwareStatus: "UPDATE_PENDING",
      },
    });

    // Create a firmware download record (this will be picked up by the device)
    await prisma.firmwareDownload.create({
      data: {
        deviceId,
        firmwareId,
        status: "INITIATED",
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Firmware deployment initiated. The device will update on next check-in.",
      firmwareVersion: firmware.version,
    });
  } catch (error) {
    console.error("Error deploying firmware:", error);
    return NextResponse.json(
      { error: "Failed to deploy firmware" },
      { status: 500 }
    );
  }
}
