import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get deviceId from query params
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");

    if (!deviceId) {
      return NextResponse.json(
        { error: "Device ID is required" },
        { status: 400 }
      );
    }

    // Check if device exists in database
    const device = await prisma.device.findUnique({
      where: {
        device_id: deviceId,
      },
      select: {
        device_id: true,
        name: true,
        description: true,
        model: true,
        roomId: true,
        isPaired: true,
      },
    });

    if (!device) {
      return NextResponse.json(
        { exists: false, message: "Device not found" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      exists: true,
      device: {
        deviceId: device.device_id,
        name: device.name,
        description: device.description,
        model: device.model,
        roomId: device.roomId,
        isPaired: device.isPaired,
      },
    });
  } catch (error) {
    console.error("[DEVICE_CHECK]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
