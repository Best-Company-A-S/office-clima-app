import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");
    const currentVersion = searchParams.get("currentVersion");
    const modelType = searchParams.get("modelType");

    if (!deviceId || !currentVersion || !modelType) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Get device to check auto-update setting
    const device = await prisma.device.findUnique({
      where: { device_id: deviceId },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Find the latest released firmware for this model type
    const latestFirmware = await prisma.firmware.findFirst({
      where: {
        modelType,
        status: "RELEASED",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestFirmware) {
      return NextResponse.json(
        {
          updateAvailable: false,
          message: "No firmware available for this device model",
        },
        { status: 200 }
      );
    }

    // Clean version strings to ensure proper comparison
    const cleanCurrentVersion = currentVersion.startsWith("v")
      ? currentVersion
      : `v${currentVersion}`;

    const cleanLatestVersion = latestFirmware.version.startsWith("v")
      ? latestFirmware.version
      : `v${latestFirmware.version}`;

    // Check if device needs an update
    // For more sophisticated version comparison, consider using semver
    const updateAvailable = cleanCurrentVersion !== cleanLatestVersion;

    // Update device record with latest check
    await prisma.device.update({
      where: { device_id: deviceId },
      data: {
        lastSeenAt: new Date(),
      },
    });

    // If update is available and auto-update is enabled, trigger update
    let autoUpdateTriggered = false;
    if (updateAvailable && device.autoUpdate) {
      await prisma.device.update({
        where: { device_id: deviceId },
        data: {
          firmwareStatus: "UPDATE_PENDING",
        },
      });

      await prisma.firmwareDownload.create({
        data: {
          deviceId,
          firmwareId: latestFirmware.id,
          status: "INITIATED",
        },
      });

      autoUpdateTriggered = true;
    }

    return NextResponse.json({
      updateAvailable,
      autoUpdateTriggered,
      latestVersion: cleanLatestVersion,
      releaseNotes: latestFirmware.releaseNotes,
      size: latestFirmware.fileSize,
      message: updateAvailable
        ? autoUpdateTriggered
          ? "New firmware version available and auto-update has been triggered"
          : "New firmware version available"
        : "Device firmware is up to date",
    });
  } catch (error) {
    console.error("Firmware check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
