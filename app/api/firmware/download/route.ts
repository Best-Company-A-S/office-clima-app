import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");
    const version = searchParams.get("version");
    const modelType = searchParams.get("modelType");

    if (!deviceId || !version || !modelType) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Find the requested firmware version
    const firmware = await prisma.firmware.findFirst({
      where: {
        version,
        modelType,
        status: "RELEASED",
      },
    });

    if (!firmware) {
      return NextResponse.json(
        { error: "Firmware version not found" },
        { status: 404 }
      );
    }

    // Update device status to indicate update in progress
    await prisma.device.update({
      where: { device_id: deviceId },
      data: {
        firmwareStatus: "UPDATING",
        lastSeenAt: new Date(),
      },
    });

    // Log the firmware download
    const download = await prisma.firmwareDownload.create({
      data: {
        deviceId,
        firmwareId: firmware.id,
        status: "INITIATED",
      },
    });

    // Determine the full path to the firmware file
    const filePath = path.join(process.cwd(), "public", firmware.filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`Firmware file not found at path: ${filePath}`);

      // Update download record to indicate failure
      await prisma.firmwareDownload.update({
        where: { id: download.id },
        data: {
          status: "FAILED",
        },
      });

      return NextResponse.json(
        { error: "Firmware file not found on server" },
        { status: 404 }
      );
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);

    // Update download record
    await prisma.firmwareDownload.update({
      where: { id: download.id },
      data: {
        status: "COMPLETED",
      },
    });

    // Return the firmware binary file
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${firmware.filename}"`,
        "Content-Length": firmware.fileSize.toString(),
      },
    });
  } catch (error) {
    console.error("Firmware download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
