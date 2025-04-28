# Office Clima - Indoor Climate Monitoring App

<div align="center">
  <img src="docs/images/clima-app-logo.png" alt="Clima App Logo" width="180">
  
  <h3>Next-Generation Indoor Climate Monitoring</h3>
  
  ![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)
  ![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.0-336791?logo=postgresql)
  ![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?logo=prisma)
</div>

---

## Project Overview

Office Clima er en Next.js applikation designet til at overvåge og administrere indeklima-forhold på tværs af forskellige kontorer og rum. Appen giver teams mulighed for at spore temperatur- og fugtighedsdata fra IoT-enheder, visualisere klimatendenser og træffe datadrevne beslutninger for at forbedre komforten på arbejdspladsen.

Systemet kombinerer realtids-IoT-sensordata med sofistikerede algoritmer til analyse af klimakvalitet for at give handlingsorienterede indsigter om indeklimaforhold.

## Projektstatus

Vi udvikler dette projekt som en del af uddannelsesforløb, hvor vi dækker en række faglige målpinde. Du kan se vores [projektstatus i forhold til målpindene her](projekt-status.md).

## Key Features

### 🏢 Team & Organization Management

- **Team Oprettelse & Administration**: Opret og administrer flere teams inden for en organisation
- **Rollebaseret adgangskontrol**: Definer admin-, manager- og medlemsroller med passende tilladelser
- **Team invitationer**: Send e-mailinvitationer eller generer invitationskoder
- **Team indstillinger**: Konfigurer teamindstillinger for temperaturenheder (°C/°F) og fugtighedsvisning

### 🚪 Room Management

- **Rum organisering**: Opret, rediger og slet rum inden for teamområder
- **Rum kategorisering**: Kategoriser rum efter typer (kontor, mødelokale, klasseværelse osv.)
- **Rum specifikationer**: Definer rumstørrelse, kapacitet og særlige egenskaber
- **Status indikatorer**: Indikatorer for klimakvalitet på et øjeblik for hvert rum

### 📱 Device Integration

- **Enhedsparring**: Simpelt QR-kodebaseret system til parring af enheder
- **Enhedssundhedsovervågning**: Spor enhedsstatus, batteriniveauer og forbindelseskvalitet
- **Firmware opdateringer**: Håndter firmware-opdateringer til IoT-enheder

### 📊 Dashboard & Analytics

- **Interaktiv klimavisualisering**: Rige, interaktive diagrammer, der viser temperatur- og fugtighedstendenser
- **Rum sammenligning**: Avancerede sammenligningsværktøjer til analyse af flere rum samtidigt
- **Klimakvalitetsvurdering**: Sofistikerede algoritmer til evaluering af indeklimakvalitet
- **Realtidsovervågning**: Live opdateringer af temperatur- og fugtighedsforhold

## System Architecture

```mermaid
graph TD
    subgraph "Client Layer"
        User[User Browser/Device]
        User -->|HTTPS Requests| Frontend[Next.js Frontend]
    end

    subgraph "Application Layer"
        Frontend -->|API Requests| API[Next.js API Routes]
        API -->|Authentication| Auth[NextAuth.js]
        Frontend -->|State Management| React[React Context/Hooks]
        Frontend -->|UI Components| UI[Shadcn/UI + Tailwind]
        UI -->|Data Visualization| Charts[Recharts Library]
    end

    subgraph "Data Layer"
        API -->|ORM| Prisma[Prisma ORM]
        Prisma -->|SQL| DB[(PostgreSQL Database)]
    end

    subgraph "IoT Layer"
        IoTDevices[IoT Climate Devices]
        IoTGateway[Optional IoT Gateway]
        IoTDevices -->|MQTT/HTTP| IoTGateway
        IoTGateway -->|HTTP| API
        IoTDevices -->|Direct HTTP| API
    end

    subgraph "External Services"
        Auth -->|OAuth| AuthProviders[OAuth Providers]
        API -->|Notifications| NotificationSystem[Notification System]
    end

    style Frontend fill:#f9f9f9,stroke:#333,stroke-width:2px
    style API fill:#f9f9f9,stroke:#333,stroke-width:2px
    style DB fill:#e1f5fe,stroke:#333,stroke-width:2px
    style IoTDevices fill:#e8f5e9,stroke:#333,stroke-width:2px
```

## Technical Stack

### Frontend

- **Framework**: Next.js med App Router
- **UI Library**: React med Server Components
- **Styling**: Tailwind CSS med custom theme
- **Component Library**: Shadcn/UI (bygget på Radix UI)
- **Data Visualization**: Recharts for interaktive grafer
- **State Management**: React Context API og Hooks
- **Forms**: React Hook Form med Zod validation
- **Authentication**: NextAuth.js integration

### Backend

- **API**: Next.js API routes med route handlers
- **Database ORM**: Prisma ORM for type-safe queries
- **Database**: PostgreSQL i Docker container
- **Authentication**: NextAuth.js med multiple providers
- **Validation**: Zod schema validation

### IoT Integration

- **Protocols**: HTTP
- **Device Management**: Custom device registration og management system
- **OTA Updates**: Over-the-air firmware opdateringer til IoT-enheder

## Database Schema

Vores aktuelle database schema implementerer følgende datamodeller:

```prisma
model Team {
  id String @id @default(uuid())
  name String
  description String?
  ownerId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  members TeamMember[]
  invites TeamInvite[]
  rooms Room[]
  settings TeamSettings[]
  dashboardLayouts DashboardLayout[]
}

model Room {
  id String @id @default(uuid())
  name String
  description String?
  type String? // office, classroom, meeting room, etc.
  size Int? // size in square meters/feet
  capacity Int? // max number of people
  teamId String
  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  devices Device[]
  surveys Survey[]
}

model Device {
  device_id String @id
  name String?
  description String?
  model String?
  firmwareVersion String?
  firmwareStatus String? // "UP_TO_DATE", "UPDATING", "UPDATE_FAILED"
  isPaired Boolean @default(false)
  lastSeenAt DateTime?
  lastUpdatedAt DateTime?
  batteryVoltage Float?
  batteryPercentage Int?
  batteryTimeRemaining Int?
  autoUpdate Boolean @default(false) // Whether to auto-update from GitHub releases
  roomId String?
  room Room? @relation(fields: [roomId], references: [id])
  pairedAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  readings DeviceReading[]
  firmwareDownloads FirmwareDownload[]
}

model DeviceReading {
  id String @id @default(uuid())
  deviceId String
  device Device @relation(fields: [deviceId], references: [device_id], onDelete: Cascade)
  temperature Float
  humidity Float
  batteryVoltage Float?
  batteryPercentage Int?
  batteryTimeRemaining Int?
  timestamp DateTime
  createdAt DateTime @default(now())

  @@index([deviceId])
  @@index([timestamp])
}

model Survey {
  id          String           @id @default(uuid())
  title       String
  active      Boolean          @default(true)
  roomId      String
  room        Room             @relation(fields: [roomId], references: [id], onDelete: Cascade)
  createdById Int
  responses   SurveyResponse[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  questions   Json             @default("[{\"id\":\"comfort\",\"text\":\"How do you feel about the indoor climate?\"},{\"id\":\"suggestions\",\"text\":\"Do you have any suggestions for improvement?\"}]")

  @@index([roomId])
  @@index([createdById])
}
```

## Key Components

### 1. RoomCard Component

Viser et kort med oplysninger om et rum og dets klimaforhold:

```tsx
<RoomCard
  key={room.id}
  room={room}
  latestReading={readings[room.id]}
  onViewDetails={handleViewDetails}
  teamSettings={teamSettings}
/>
```

### 2. DeviceList Component

Viser en liste af enheder og deres status:

```tsx
<DeviceList
  devices={devices}
  onDeviceSelect={handleDeviceSelect}
  onPairDevice={handlePairDevice}
  onEditDevice={handleEditDevice}
/>
```

### 3. DeviceReadingsChart Component

Visualiserer temperatur- og fugtighedsdata over tid:

```tsx
<DeviceReadingsChart
  deviceId={selectedDevice.id}
  timePeriod={timePeriod}
  height={400}
/>
```

### 4. DeviceFirmwareManager Component

Håndterer firmware-opdateringer til IoT-enheder:

```tsx
<DeviceFirmwareManager
  deviceId={selectedDevice.id}
  currentVersion={selectedDevice.firmwareVersion}
  onUpdateFirmware={handleUpdateFirmware}
/>
```

## Installation & Setup

### Prerequisites

- Node.js 18+ (anbefalet: brug seneste LTS-version)
- Docker og Docker Compose
- npm eller yarn package manager

### Step-by-Step Installation

1. **Klon repository**

```bash
git clone https://github.com/yourusername/clima-app.git
cd clima-app
```

2. **Installer dependencies**

```bash
npm install
# eller
yarn install
```

3. **Opsæt miljøvariabler**

Opret en `.env` fil med følgende værdier:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/clima_db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars-long"

# Application Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Start PostgreSQL databasen med Docker**

```bash
docker-compose up -d
```

5. **Kør Prisma migrationer**

```bash
npx prisma migrate dev
npx prisma generate
```

6. **Start udviklingsserveren**

```bash
npm run dev
# eller
yarn dev
```

7. **Tilgå applikationen**

Åbn [http://localhost:3000](http://localhost:3000) i din browser

## Projektets Objektorienterede Design

Projektet anvender objektorienteret design med TypeScript hvor:

- Klasser og interfaces definerer datamodeller
- Arv og komposition bruges til at opbygge komponenthierarkiet
- Indkapsling sker gennem private og protected modifiers
- Polymorfisme opnås gennem interfaces og generics

## Krav til Målpinde

Dette projekt er udviklet med henblik på at opfylde en række faglige målpinde. Se [målpinde-listen](projekt-status.md) for en detaljeret oversigt over, hvilke faglige mål projektet dækker.
