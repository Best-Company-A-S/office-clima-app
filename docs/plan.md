# Climate Overview System

## UML Diagram

```
+-------------------+
|   User           |
+-------------------+
          |
          v
+-------------------+
|   Hono API    |
| - User Auth      |
| - API Calls      |
| - Room Surveys  |
| - Subscription   |
+-------------------+
          |
          v
+-------------------+
|   Vite/react Dashboard |
| - Room Comparisons  |
| - QR Code for Pairing |
| - User Management   |
+-------------------+
          |
          v
+-------------------+
|   Arduino Device   |
| - Climate Data     |
| - QR Code for Pairing |
+-------------------+
```

## Preliminary Design Review (PDR)

### Overview

The Climate Overview System integrates Arduino sensors with a Hono API and a dashboard for climate monitoring and user feedback analysis.

### Hardware

- Arduino with temperature, humidity, and air quality sensors
- QR code generation module ### Software - Hono API for managing data flow - Vite/react-based dashboard for visualization
- API subscription model for usage tracking
- QR code-based pairing and survey functionality

### Goals

- Enable users to compare room climates
- Allow subjective survey input and correlate it with sensor data
- Provide easy device pairing and subscription management

## Product Requirements Document (PRD)

### Functional Requirements

1. **Arduino Device**

   - Collect and send climate data (temperature, humidity, air quality)
   - Generate a QR code for easy pairing

2. **Hono API**

   - Store sensor data
   - Provide endpoints for room comparisons
   - Handle API subscriptions and call limits
   - Process survey results and correlate them with sensor data

3. **Vite/React Dashboard**
   - Display connected Arduino devices
   - Show room climate comparisons
   - Provide a QR code scanner for surveys and device pairing
   - Manage user roles and access

### Database Design

- **Workspaces**: Contains multiple rooms and can have multiple team members.
- **Rooms**: Each workspace contains multiple rooms, where Arduino devices are installed.
- **Devices**: Each room has connected Arduino devices that send climate data.
- **Users**: Users can belong to multiple workspaces with different roles.
- **Surveys**: Users can submit feedback about room climate, which is stored and compared with sensor data.

### Non-Functional Requirements

- Secure authentication and authorization
- Scalable API architecture
- Responsive and user-friendly dashboard

## To-Do List

### Arduino

- [ ] Implement sensor data collection
- [ ] Generate QR codes for device pairing
- [ ] Establish connection with Hono API

### Hono API

- [ ] Implement authentication and API key management
- [ ] Store climate data from Arduino
- [ ] Develop API for fetching room comparisons
- [ ] Implement survey feature for user feedback
- [ ] Handle API subscriptions and usage tracking
- [ ] Implement workspace, room, and device management

### Vite/react Dashboard

- [ ] Design UI for room climate visualization
- [ ] Implement QR code scanner for surveys
- [ ] Allow users to compare room climates
- [ ] Provide subscription management features
- [ ] Implement workspace and team management features
