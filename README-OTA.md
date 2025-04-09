# H2Climate OTA Firmware Update System

This document explains how the H2Climate Over-The-Air (OTA) firmware update system works, including GitHub integration for automatic updates.

## System Overview

The H2Climate OTA update system provides a seamless way to update device firmware remotely. The system integrates with GitHub releases to automatically fetch and deploy new firmware versions.

![OTA Update Flow](docs/images/ota-update-flow.png)

## Key Features

- **GitHub Release Integration**: Automatically synchronize firmware from GitHub releases
- **Multiple Device Support**: Support for different device models (Arduino UNO R4 WiFi, ESP32, ESP8266, etc.)
- **Auto-Update Toggle**: Devices can be configured to automatically update or require manual approval
- **Version Management**: Track firmware versions, including draft and released states
- **Secure Downloads**: MD5 checksum verification for firmware integrity
- **Update Status Tracking**: Monitor update progress and status

## How It Works

### GitHub Integration

1. **Release Creation**: When you create a new GitHub release with `.bin` firmware files:

   - Tag name becomes the firmware version (e.g., `v0.7.0`)
   - Release body becomes the release notes
   - Binary assets are identified as firmware files

2. **Synchronization**: The app syncs with GitHub in two ways:

   - Manual sync via the "Sync with GitHub" button in the UI
   - (Future) Automatic sync via GitHub webhooks on new releases

3. **Authentication**: Private repositories require a GitHub Personal Access Token with `repo` scope

### Update Process

1. **Device Check-in**: Devices periodically check for updates via the `/api/firmware/check` endpoint

   - Device sends its current version, model type, and ID
   - Server checks if a newer version is available

2. **Auto-Update**: If auto-update is enabled, the device will automatically download and install the new firmware

   - Server responds with `autoUpdateTriggered: true` in the API response
   - Device downloads the firmware binary from the `/api/firmware/download` endpoint
   - Device verifies the MD5 checksum before flashing the firmware

3. **Manual Update**: If auto-update is disabled, the update requires manual approval
   - Admin can force an update via the "Force Update" button
   - Admin can deploy a specific firmware version via the "Deploy" button
   - Device checks update status on next check-in and downloads if pending

### Arduino Code Integration

The Arduino code includes functionality for:

1. Checking for updates at regular intervals
2. Downloading firmware binaries
3. Verifying firmware integrity
4. Flashing the new firmware
5. Reporting update status back to the server

## Setup Instructions

### 1. GitHub Token Setup

For private repositories, add a GitHub Personal Access Token to your `.env` file:

```
GITHUB_TOKEN="your_github_token_here"
```

Create this token in GitHub under Settings → Developer settings → Personal access tokens with `repo` scope.

### 2. GitHub Repository Structure

Organize your GitHub releases following these conventions:

- **Tag Names**: Use semantic versioning (e.g., `v0.7.0`)
- **Binary Files**: Name firmware files with device type information:
  - Example: `H2Climate_v0.7.0_Arduino_UNO_R4_WiFi.bin`
- **Release Notes**: Add detailed descriptions of changes in the release body

### 3. Database Setup

The system uses three main database models:

1. **Device**: Tracks device information including auto-update setting
2. **Firmware**: Stores firmware metadata and file locations
3. **FirmwareDownload**: Records firmware deployment history

Run migrations to create these tables:

```
npx prisma migrate dev --name add-firmware-tables
```

## Web UI Features

The firmware management interface provides:

1. **Device Status Overview**:

   - Current firmware version
   - Update status
   - Last update timestamp

2. **Auto-Update Toggle**:

   - Enable/disable automatic updates from GitHub

3. **GitHub Synchronization**:

   - Manual sync with GitHub releases
   - View available firmware versions

4. **Manual Update Controls**:
   - Force immediate update
   - Deploy specific firmware versions
   - Upload custom firmware

## API Endpoints

- **GET /api/firmware/check**: Check for firmware updates
- **GET /api/firmware/download**: Download firmware binaries
- **POST /api/firmware/upload**: Upload custom firmware
- **POST /api/firmware/sync-github**: Sync with GitHub releases
- **PATCH /api/devices/[deviceId]**: Update device settings
- **POST /api/devices/[deviceId]/forceUpdate**: Force device update
- **POST /api/devices/[deviceId]/deployFirmware**: Deploy specific firmware

## Troubleshooting

- **404 GitHub Errors**: Check your GitHub token permissions and repository path
- **Upload Failures**: Ensure proper file naming convention and permissions
- **Update Status Issues**: Check the device logs for download/flashing errors

## Security Considerations

1. Keep your GitHub token secure and never commit it to public repositories
2. Use HTTPS for all API endpoints
3. Implement firmware binary signing (planned feature)
