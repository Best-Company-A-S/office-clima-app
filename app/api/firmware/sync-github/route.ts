import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

// GitHub repository details - make sure this is exactly correct
const GITHUB_REPO = "Best-Company-A-S/office-clima-device";
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_REPO}`;

// GitHub personal access token - required for private repositories
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

export async function POST(request: NextRequest) {
  try {
    // Validate GitHub token is available
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        {
          error: "GitHub token is missing",
          message:
            "A GitHub token with repo access is required to access private repositories. Please add GITHUB_TOKEN to your environment variables.",
        },
        { status: 401 }
      );
    }

    // For fine-grained tokens and classic tokens
    const isFinegrained = GITHUB_TOKEN.startsWith("github_pat_");
    const authHeaderValue = `${
      isFinegrained ? "Bearer" : "token"
    } ${GITHUB_TOKEN}`;

    console.log(
      `Using ${isFinegrained ? "fine-grained" : "classic"} GitHub token`
    );

    // Setup request headers with authentication
    const headers = {
      Authorization: authHeaderValue,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "H2Climate-App",
    };

    // First test basic API access
    try {
      const userResponse = await axios.get("https://api.github.com/user", {
        headers,
      });
      console.log(
        `GitHub API access successful. Authenticated as: ${userResponse.data.login}`
      );
    } catch (error: any) {
      console.error(
        "GitHub authentication failed:",
        error.response?.status,
        error.response?.data?.message
      );
      return NextResponse.json(
        {
          error: "GitHub authentication failed",
          message:
            error.response?.data?.message || "Invalid token or token expired",
          status: error.response?.status,
        },
        { status: 401 }
      );
    }

    // Check if we can access the specific repository
    try {
      const repoResponse = await axios.get(GITHUB_API_BASE, { headers });
      console.log(
        `Repository access successful: ${repoResponse.data.full_name}`
      );

      // Show if repo is private
      if (repoResponse.data.private) {
        console.log("Repository is private");
      } else {
        console.log("Repository is public");
      }
    } catch (error: any) {
      console.error(
        "GitHub repository access failed:",
        error.response?.status,
        error.response?.data?.message
      );

      // Special message for 404 errors which likely means the repo doesn't exist or no access
      if (error.response?.status === 404) {
        // Try to list available repositories to help troubleshooting
        let availableRepos = [];
        try {
          const orgResponse = await axios.get(
            "https://api.github.com/orgs/Best-Company-A-S/repos",
            { headers }
          );
          availableRepos = orgResponse.data.map((repo: any) => repo.name);
        } catch (orgError) {
          // If this fails, try to get user repos instead
          try {
            const userReposResponse = await axios.get(
              "https://api.github.com/user/repos",
              { headers }
            );
            availableRepos = userReposResponse.data.map(
              (repo: any) => repo.name
            );
          } catch (userRepoError) {
            // Couldn't get any repos, just continue
          }
        }

        return NextResponse.json(
          {
            error: "Repository not found",
            message: `The repository '${GITHUB_REPO}' was not found or your token doesn't have access to it.`,
            details: {
              token_type: GITHUB_TOKEN.startsWith("github_pat_")
                ? "Fine-grained token"
                : "Classic token",
              organization: "Best-Company-A-S",
              available_repos:
                availableRepos.length > 0
                  ? availableRepos
                  : "No readable repositories found",
              recommendations: [
                "1. Verify the repository name is correct",
                "2. Check that your token has the 'repo' or 'contents:read' permission for this repository",
                "3. Visit /api/firmware/github-token for detailed instructions on setting up a token",
              ],
            },
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          error: "Cannot access GitHub repository",
          message:
            error.response?.data?.message ||
            "Unknown error accessing repository",
          status: error.response?.status,
        },
        { status: error.response?.status || 500 }
      );
    }

    // Fetch releases from GitHub
    try {
      const releasesResponse = await axios.get(`${GITHUB_API_BASE}/releases`, {
        headers,
      });
      const releases = releasesResponse.data;

      if (releases.length === 0) {
        return NextResponse.json({
          success: true,
          message: "No releases found in the repository.",
        });
      }

      console.log(`Found ${releases.length} releases in the repository`);

      // Track new firmware versions
      const newFirmwareCount = await processReleases(releases, headers);

      return NextResponse.json({
        success: true,
        message: `Synchronized with GitHub releases. Found ${newFirmwareCount} new firmware version(s).`,
        totalReleases: releases.length,
      });
    } catch (error: any) {
      console.error(
        "Error fetching GitHub releases:",
        error.response?.status,
        error.response?.data?.message
      );
      return NextResponse.json(
        {
          error: "Failed to fetch GitHub releases",
          message:
            error.response?.data?.message ||
            "Error accessing repository releases",
          status: error.response?.status,
        },
        { status: error.response?.status || 500 }
      );
    }
  } catch (error: any) {
    console.error("Error syncing with GitHub:", error);
    return NextResponse.json(
      { error: "Failed to sync with GitHub releases", message: error.message },
      { status: 500 }
    );
  }
}

async function processReleases(releases: any[], headers: any) {
  let newFirmwareCount = 0;

  for (const release of releases) {
    // Skip draft releases
    if (release.draft) continue;

    const version = release.tag_name;
    const releaseNotes = release.body || "";
    const isPrerelease = release.prerelease;

    console.log(
      `Processing release: ${version} (${
        isPrerelease ? "prerelease" : "stable"
      })`
    );
    console.log(`Assets: ${release.assets.length}`);

    // Look for .bin assets
    for (const asset of release.assets) {
      if (asset.name.endsWith(".bin")) {
        console.log(
          `Found firmware asset: ${asset.name}, size: ${asset.size} bytes`
        );
        console.log(`Asset download URL: ${asset.url}`);
        console.log(
          `Asset browser download URL: ${asset.browser_download_url}`
        );

        // Try to determine model type from filename
        const modelType = extractModelType(asset.name);
        console.log(`Detected model type: ${modelType}`);

        // Check if this firmware already exists
        const existingFirmware = await prisma.firmware.findFirst({
          where: {
            version,
            modelType,
          },
        });

        if (!existingFirmware) {
          try {
            // Download firmware file using the API URL instead of browser_download_url
            await downloadAndStoreFirmware(
              asset.url, // Use asset.url instead of browser_download_url
              version,
              modelType,
              asset.name,
              asset.size,
              releaseNotes,
              !isPrerelease,
              headers
            );

            console.log(`Added new firmware: ${version} for ${modelType}`);
            newFirmwareCount++;
          } catch (error) {
            console.error(
              `Failed to process firmware asset ${asset.name}:`,
              error
            );
            // Continue with next asset
          }
        } else {
          console.log(
            `Firmware ${version} for ${modelType} already exists in database.`
          );
        }
      }
    }
  }

  return newFirmwareCount;
}

function extractModelType(filename: string): string {
  // Remove the .bin extension first
  const nameWithoutBin = filename.replace(".bin", "");

  // Split by underscore
  const parts = nameWithoutBin.split("_");

  if (parts.length >= 3) {
    // Get everything after the version part
    const modelParts = parts.slice(2);

    // Special handling for uno_r4.ino format
    if (modelParts.join("_").includes("uno_r4")) {
      return "Arduino_UNO_R4_WiFi";
    }

    // For other formats, join with underscores and convert to standard format
    const modelType = modelParts
      .join("_")
      .replace(".ino", "")
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("_");

    return modelType;
  }

  // Default to Arduino UNO R4 WiFi if we can't parse the name
  return "Arduino_UNO_R4_WiFi";
}

async function downloadAndStoreFirmware(
  url: string,
  version: string,
  modelType: string,
  filename: string,
  fileSize: number,
  releaseNotes: string,
  isReleased: boolean,
  headers: any
) {
  try {
    console.log(`Attempting to download firmware from: ${url}`);
    console.log(
      "Using headers:",
      JSON.stringify(
        {
          ...headers,
          Authorization: headers.Authorization
            ? "Bearer [REDACTED]"
            : undefined,
        },
        null,
        2
      )
    );

    // Ensure version has 'v' prefix
    const cleanVersion = version.startsWith("v") ? version : `v${version}`;

    // Create directory structure
    const modelDir = path.join(process.cwd(), "public", "firmware", modelType);
    if (!fs.existsSync(modelDir)) {
      console.log(`Creating directory: ${modelDir}`);
      await mkdir(modelDir, { recursive: true });
    }

    // Use the headers passed from the main function which already include proper authentication
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        ...headers,
        Accept: "application/octet-stream", // Important for downloading binary files
      },
    });

    console.log(`Download successful with status: ${response.status}`);
    console.log(`Downloaded firmware: ${response.data.byteLength} bytes`);

    // Calculate MD5 hash
    const fileBuffer = Buffer.from(response.data);
    const md5sum = crypto.createHash("md5").update(fileBuffer).digest("hex");
    console.log(`Firmware MD5 checksum: ${md5sum}`);

    // Save file to disk
    const filePath = path.join("firmware", modelType, filename);
    const absolutePath = path.join(process.cwd(), "public", filePath);
    await writeFile(absolutePath, fileBuffer);
    console.log(`Saved firmware file to: ${absolutePath}`);

    // Save to database
    const firmware = await prisma.firmware.create({
      data: {
        version: cleanVersion,
        modelType,
        releaseNotes,
        filename,
        fileSize,
        filePath: filePath.replaceAll("\\", "/"), // Ensure consistent path format
        checksumMD5: md5sum,
        status: isReleased ? "RELEASED" : "DRAFT",
      },
    });

    console.log(`Added firmware to database with ID: ${firmware.id}`);
    return true;
  } catch (error: any) {
    console.error(
      `Error downloading firmware ${filename}:`,
      error.response
        ? `Status: ${error.response.status}, Message: ${error.response.data}`
        : error.message
    );
    throw error;
  }
}
