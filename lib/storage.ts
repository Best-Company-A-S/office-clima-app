import fs from "fs";
import path from "path";

// Base directory for storage
const STORAGE_DIR = path.join(process.cwd(), "public/uploads");

/**
 * Deletes a file from the storage system
 * @param filePath Path of the file to delete, relative to the storage directory
 * @returns Promise that resolves when the file is deleted
 */
export async function deleteFile(filePath: string): Promise<void> {
  const fullPath = path.join(STORAGE_DIR, filePath);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  return new Promise((resolve, reject) => {
    fs.unlink(fullPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Ensures storage directory exists
 * @param directory Directory to create
 */
export function ensureStorageDirectory(directory: string = ""): void {
  const dirPath = path.join(STORAGE_DIR, directory);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Gets the absolute path to a file in storage
 * @param filePath Relative path to the file
 * @returns Absolute path to the file
 */
export function getStoragePath(filePath: string): string {
  return path.join(STORAGE_DIR, filePath);
}
