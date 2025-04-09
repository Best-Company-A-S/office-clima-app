import { NextRequest } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";

// Define interface for file data
interface FileData {
  filepath: string;
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
}

// Define return type of parseForm function
interface ParseFormResult {
  fields: Record<string, string[]>;
  files: Record<string, FileData[]>;
}

export const parseForm = async (req: NextRequest): Promise<ParseFormResult> => {
  const formData = await req.formData();
  const fields: Record<string, string[]> = {};
  const files: Record<string, FileData[]> = {};

  // Create temp directory for file uploads
  const tempDir = path.join(os.tmpdir(), "clima-app-uploads");
  await mkdir(tempDir, { recursive: true });

  for (const [name, value] of formData.entries()) {
    if (typeof value === "string") {
      // Handle regular form field
      if (!fields[name]) {
        fields[name] = [];
      }
      fields[name].push(value);
    } else if (value instanceof File) {
      // Handle file field
      const buffer = Buffer.from(await value.arrayBuffer());

      // Generate unique filename to avoid collisions
      const uniqueId = crypto.randomBytes(8).toString("hex");
      const fileExt = path.extname(value.name);
      const filename = `${path.basename(
        value.name,
        fileExt
      )}-${uniqueId}${fileExt}`;
      const filepath = path.join(tempDir, filename);

      // Write file to temp directory
      await writeFile(filepath, buffer);

      // Create file object
      const fileData: FileData = {
        filepath,
        originalname: value.name,
        filename,
        mimetype: value.type,
        size: buffer.length,
      };

      if (!files[name]) {
        files[name] = [];
      }
      files[name].push(fileData);
    }
  }

  return { fields, files };
};
