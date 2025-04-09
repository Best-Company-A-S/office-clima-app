import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseForm } from "@/lib/formParser";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { readFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Parse the multipart form data
    const { fields, files } = await parseForm(request);

    const version = fields.version?.[0];
    const modelType = fields.modelType?.[0];
    const releaseNotes = fields.releaseNotes?.[0] || "";
    const firmwareFile = files.file?.[0];

    // Validate inputs
    if (!version || !modelType || !firmwareFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure version has 'v' prefix
    const cleanVersion = version.startsWith("v") ? version : `v${version}`;

    // Generate filename
    const filename = `H2Climate_${cleanVersion}_${modelType
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")}.bin`;

    // Setup directory path
    const modelDir = path.join(process.cwd(), "public", "firmware", modelType);

    // Create directory if it doesn't exist
    try {
      if (!fs.existsSync(modelDir)) {
        fs.mkdirSync(modelDir, { recursive: true });
      }
    } catch (error) {
      console.error("Error creating firmware directory:", error);
      return NextResponse.json(
        { error: "Failed to create firmware directory" },
        { status: 500 }
      );
    }

    // Calculate relative path for database
    const relativePath = path.join("firmware", modelType, filename);
    const absolutePath = path.join(process.cwd(), "public", relativePath);

    // Read file buffer for MD5 calculation
    const fileBuffer = await readFile(firmwareFile.filepath);
    const md5sum = crypto.createHash("md5").update(fileBuffer).digest("hex");

    // Save the file
    try {
      await fs.promises.copyFile(firmwareFile.filepath, absolutePath);
    } catch (error) {
      console.error("Error copying firmware file:", error);
      return NextResponse.json(
        { error: "Failed to save firmware file" },
        { status: 500 }
      );
    }

    // Save metadata to database
    try {
      // Check if firmware version already exists
      const existingFirmware = await prisma.firmware.findFirst({
        where: {
          modelType,
          version: cleanVersion,
        },
      });

      if (existingFirmware) {
        return NextResponse.json(
          { error: "Firmware version already exists for this model" },
          { status: 409 }
        );
      }

      // Create new firmware record
      const firmware = await prisma.firmware.create({
        data: {
          version: cleanVersion,
          modelType,
          releaseNotes,
          filename,
          fileSize: firmwareFile.size,
          filePath: relativePath.replaceAll("\\", "/"), // Ensure consistent path format
          checksumMD5: md5sum,
          status: "DRAFT", // Default to draft until explicitly released
        },
      });

      return NextResponse.json({
        success: true,
        firmwareId: firmware.id,
        version: cleanVersion,
        status: "DRAFT",
        message: "Firmware uploaded successfully",
      });
    } catch (error) {
      console.error("Error saving firmware metadata:", error);
      return NextResponse.json(
        { error: "Failed to save firmware metadata" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Firmware upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
