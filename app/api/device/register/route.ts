import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      deviceId,
      firmwareVersion,
      modelType,
      batteryVoltage,
      batteryPercentage,
    } = body;

    console.log("device_id", deviceId);
    console.log("firmwareVersion", firmwareVersion);
    console.log("modelType", modelType);

    const findDevice = await prisma.device.findUnique({
      where: {
        device_id: deviceId,
      },
    });

    if (findDevice) {
      // Update the firmware version for existing device
      const updatedDevice = await prisma.device.update({
        where: {
          device_id: deviceId,
        },
        data: {
          firmwareVersion,
          model: modelType,
          lastSeenAt: new Date(),
          firmwareStatus: "UP_TO_DATE",
          ...(batteryVoltage && { batteryVoltage }),
          ...(batteryPercentage && { batteryPercentage }),
        },
      });
      return NextResponse.json(updatedDevice);
    }

    const device = await prisma.device.create({
      data: {
        device_id: deviceId,
        firmwareVersion,
        model: modelType,
        firmwareStatus: "UP_TO_DATE",
        ...(batteryVoltage && { batteryVoltage }),
        ...(batteryPercentage && { batteryPercentage }),
      },
    });

    return NextResponse.json(device);
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

/* Curl Command

curl -L -X POST http://localhost:3000/api/device/register \
  -H "Content-Type: application/json" \
  -d '{"device_id": "1234567890", "firmwareVersion": "1.0.0", "modelType": "ESP32"}'

*/

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    Sentry.addBreadcrumb({
      category: "auth",
      message: "Unauthorized access attempt to GET /api/device/register",
      level: "warning",
    });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const devices = await prisma.device.findMany();
    Sentry.addBreadcrumb({
      category: "device",
      message: `Successfully fetched ${devices.length} devices`,
      level: "info",
    });
    return NextResponse.json(devices);
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "Failed to fetch devices" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await auth();

  if (!session) {
    Sentry.addBreadcrumb({
      category: "auth",
      message: "Unauthorized access attempt to PUT /api/device/register",
      level: "warning",
    });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { device_id, name, description, firmwareVersion, modelType } = body;

    Sentry.setContext("device-update", {
      device_id,
      name,
      description,
      firmwareVersion,
      modelType,
    });

    const device = await prisma.device.update({
      where: { device_id },
      data: {
        name: name,
        description: description,
        isPaired: true,
        pairedAt: new Date(),
        lastSeenAt: new Date(),
        firmwareVersion: firmwareVersion,
        model: modelType,
      },
    });

    Sentry.addBreadcrumb({
      category: "device",
      message: "Device updated successfully",
      level: "info",
      data: { device_id },
    });

    return NextResponse.json(device);
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "Failed to update device" },
      { status: 500 }
    );
  }
}

/* Curl Command

curl http://localhost:3000/api/device

*/
