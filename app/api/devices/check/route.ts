import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const deviceId = searchParams.get("deviceId");

  if (!deviceId) {
    return NextResponse.json(
      { error: "Device ID is required" },
      { status: 400 }
    );
  }

  try {
    const device = await prisma.device.findUnique({
      where: { device_id: deviceId },
    });

    if (!device) {
      return NextResponse.json(
        { exists: false, message: "Device not found" },
        { status: 404 }
      );
    }

    // Return basic device info
    return NextResponse.json({
      exists: true,
      isPaired: device.isPaired,
      device: {
        id: device.device_id,
        name: device.name,
        description: device.description,
        model: device.model,
        firmwareVersion: device.firmwareVersion,
        isPaired: device.isPaired,
        pairedAt: device.pairedAt,
        lastSeenAt: device.lastSeenAt,
      },
    });
  } catch (error) {
    console.error("Error checking device:", error);
    return NextResponse.json(
      { error: "Failed to check device" },
      { status: 500 }
    );
  }
}
