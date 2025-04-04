import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // TODO: Validate request body
  const body = await request.json();
  const { device_id, firmwareVersion, modelType } = body;

  const findDevice = await prisma.device.findUnique({
    where: {
      device_id,
    },
  });

  if (findDevice) {
    return NextResponse.json({ exists: true }, { status: 409 });
  }

  const device = await prisma.device.create({
    data: {
      device_id,
      firmwareVersion,
      model: modelType,
    },
  });

  return NextResponse.json(device);
}

/* Curl Command

curl -X POST http://localhost:3000/api/device/register \
  -H "Content-Type: application/json" \
  -d '{"device_id": "1234567890", "firmwareVersion": "1.0.0", "modelType": "ESP32"}'

*/

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const devices = await prisma.device.findMany();
    return NextResponse.json(devices);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch devices" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { device_id, name, description, firmwareVersion, modelType } = body;

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

  return NextResponse.json(device);
}

/* Curl Command

curl http://localhost:3000/api/device

*/
