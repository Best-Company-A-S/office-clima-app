import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { deleteFile } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: { firmwareId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { firmwareId } = await params;

    const firmware = await prisma.firmware.findUnique({
      where: {
        id: firmwareId,
      },
    });

    if (!firmware) {
      return NextResponse.json(
        { error: "Firmware not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(firmware);
  } catch (error) {
    console.error("Error fetching firmware:", error);
    return NextResponse.json(
      { error: "Failed to fetch firmware" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { firmwareId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { firmwareId } = await params;

    // Check if firmware exists
    const firmware = await prisma.firmware.findUnique({
      where: {
        id: firmwareId,
      },
    });

    if (!firmware) {
      return NextResponse.json(
        { error: "Firmware not found" },
        { status: 404 }
      );
    }

    // Check if any device is currently using this firmware
    const devicesUsingFirmware = await prisma.device.count({
      where: {
        firmwareVersion: firmware.version,
      },
    });

    // Even if devices are using this firmware, we'll allow deletion
    // since it's just removing the file from being available for new updates

    // Delete the firmware binary file from storage
    try {
      // If you're using a storage system with deleteFile method
      await deleteFile(`firmware/${firmware.filename}`);
    } catch (storageError) {
      console.error("Warning: Could not delete firmware file:", storageError);
      // Continue with database deletion even if file deletion fails
    }

    // First delete any related FirmwareDownload records to avoid foreign key constraint errors
    await prisma.firmwareDownload.deleteMany({
      where: {
        firmwareId: firmwareId,
      },
    });

    // Finally delete the firmware record from the database
    await prisma.firmware.delete({
      where: {
        id: firmwareId,
      },
    });

    return NextResponse.json({
      message: "Firmware deleted successfully",
      devicesAffected: devicesUsingFirmware > 0 ? devicesUsingFirmware : 0,
    });
  } catch (error) {
    console.error("Error deleting firmware:", error);
    return NextResponse.json(
      { error: "Failed to delete firmware" },
      { status: 500 }
    );
  }
}
