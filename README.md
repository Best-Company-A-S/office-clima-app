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

## Detailed Database Schema

```mermaid
erDiagram
    Team {
        string id PK
        string name
        string description
        string ownerId
        datetime createdAt
        datetime updatedAt
    }

    TeamMember {
        string id PK
        string teamId FK
        string userId
        datetime createdAt
        datetime updatedAt
    }

    TeamInvite {
        string id PK
        string teamId FK
        string code
        string createdById
        datetime createdAt
        datetime updatedAt
    }

    Room {
        string id PK
        string name
        string description
        string type
        int size
        int capacity
        string teamId FK
        datetime createdAt
        datetime updatedAt
    }

    Device {
        string device_id PK
        string name
        string description
        string model
        string firmwareVersion
        string firmwareStatus
        boolean isPaired
        datetime lastSeenAt
        float batteryVoltage
        int batteryPercentage
        string roomId FK
        datetime createdAt
        datetime updatedAt
    }

    DeviceReading {
        string id PK
        string deviceId FK
        float temperature
        float humidity
        float batteryVoltage
        int batteryPercentage
        datetime timestamp
        datetime createdAt
    }

    Survey {
        string id PK
        string title
        boolean active
        string roomId FK
        int createdById
        json questions
        datetime createdAt
        datetime updatedAt
    }

    SurveyResponse {
        string id PK
        string surveyId FK
        int rating
        string comment
        json answers
        datetime createdAt
    }

    TeamSettings {
        string id PK
        string teamId FK
        string temperatureUnit
        string humidityUnit
        float temperatureThreshold
        float humidityThreshold
        boolean temperatureAlert
        boolean humidityAlert
        datetime createdAt
        datetime updatedAt
    }

    Firmware {
        string id PK
        string version
        string modelType
        string releaseNotes
        string filename
        int fileSize
        string filePath
        string checksumMD5
        string status
        datetime createdAt
        datetime updatedAt
    }

    FirmwareDownload {
        string id PK
        string deviceId FK
        string firmwareId FK
        datetime downloadedAt
        string status
    }

    Team ||--o{ TeamMember : "has"
    Team ||--o{ TeamInvite : "has"
    Team ||--o{ Room : "has"
    Team ||--o{ TeamSettings : "has"
    Room ||--o{ Device : "contains"
    Room ||--o{ Survey : "has"
    Device ||--o{ DeviceReading : "generates"
    Device ||--o{ FirmwareDownload : "has"
    Survey ||--o{ SurveyResponse : "receives"
    Firmware ||--o{ FirmwareDownload : "has"
```

## Climate Assessment Algorithm

Applikationen anvender et sofistikeret tre-lags klimavurderingssystem:

### 1. Basic Climate Assessment

```mermaid
flowchart TD
    A[Temperatur & Fugtigheds Aflæsninger] --> B[Basis Vurdering]
    B --> C{Evaluer Temperatur}
    C --> |< 20°C| D[For Koldt]
    C --> |20-24°C| E[Optimal]
    C --> |> 24°C| F[For Varmt]

    B --> G{Evaluer Fugtighed}
    G --> |< 40%| H[For Tørt]
    G --> |40-60%| I[Optimal]
    G --> |> 60%| J[For Fugtigt]

    D --> K[Beregn Temperatur Afvigelse]
    E --> K
    F --> K

    H --> L[Beregn Fugtigheds Afvigelse]
    I --> L
    J --> L

    K --> M[Kombineret Klima Score]
    L --> M

    M --> N{Bestem Kvalitet}
    N --> |Score < 1| O[Fremragende]
    N --> |Score < 2.5| P[God]
    N --> |Score < 4| Q[Moderat]
    N --> |Score < 6| R[Dårlig]
    N --> |Score >= 6| S[Meget Dårlig]
```

### 2. Room-Specific Assessment

For rum med komplet metadata (størrelse, type, kapacitet) udfører systemet en avanceret vurdering:

```mermaid
flowchart TD
    A[Rum Data] --> B[Beregn Rum Volumen]
    B --> C[Bestem Ideelle Parametre]

    D[Rum Type] --> C

    C --> E[Beregn Nødvendig Luftstrøm]
    C --> F[Beregn CO2 Belastning]
    C --> G[Indstil Ideelt Temperatur Område]
    C --> H[Indstil Ideelt Fugtigheds Område]

    I[Aktuelle Aflæsninger] --> J[Sammenlign med Ideelle Områder]
    G --> J
    H --> J

    J --> K[Beregn Afvigelses Score]

    L[Plads per Person] --> M[Rumlig Kvalitetsfaktor]
    M --> K

    K --> N[Generer Klimakvalitets Bedømmelse]
    N --> O[Giv Anbefalinger]
```

### 3. Room Comparison Flow

```mermaid
sequenceDiagram
    participant Bruger
    participant Dashboard
    participant SammenligningsEngine
    participant API
    participant Database

    Bruger->>Dashboard: Vælg rum til sammenligning
    Dashboard->>Dashboard: Opret sammenligningskontekst
    Dashboard->>SammenligningsEngine: Initialiser sammenligning

    loop For hvert valgt rum
        SammenligningsEngine->>API: Anmod om klimadata
        API->>Database: Forespørgsel om historiske aflæsninger
        Database-->>API: Returner aflæsningsdata
        API-->>SammenligningsEngine: Returner formateret data
        SammenligningsEngine->>SammenligningsEngine: Behandl & normaliser data
    end

    SammenligningsEngine->>SammenligningsEngine: Generer sammenligningsmetrikker
    SammenligningsEngine->>Dashboard: Render sammenligningsdiagrammer
    Dashboard->>Bruger: Vis visualisering

    Bruger->>Dashboard: Juster sammenligningsindstillinger
    Dashboard->>SammenligningsEngine: Opdater parametre
    SammenligningsEngine->>Dashboard: Opdater visualisering
    Dashboard->>Bruger: Vis opdateret sammenligning
```

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

## Room Types & Recommended Parameters

| Rum Type      | Temperatur Område (°C) | Fugtigheds Område (%) | Anbefalet ACH\* | Primære Overvejelser                |
| ------------- | ---------------------- | --------------------- | --------------- | ----------------------------------- |
| Kontor        | 20-22                  | 40-60                 | 8               | Produktivitet, komfort              |
| Mødelokale    | 20-22                  | 40-60                 | 15              | Koncentration, komfort              |
| Klasseværelse | 20-24                  | 40-60                 | 12              | Læringsmiljø, årvågenhed            |
| Konference    | 20-22                  | 40-60                 | 12              | Komfort, fokus                      |
| Hospital      | 20-22                  | 40-60                 | 15              | Sundhed, infektionskontrol          |
| Laboratorium  | 20-22                  | 40-60                 | 20              | Præcisionsarbejde, udstyrsbehov     |
| Gymnastiksal  | 18-22                  | 40-60                 | 20              | Fysisk aktivitet, afkøling          |
| Restaurant    | 18-22                  | 40-60                 | 20              | Spisekomfort, fødevarekonservering  |
| Bibliotek     | 20-22                  | 40-60                 | 12              | Materialekonservering, læsekomfort  |
| Fællesområde  | 20-22                  | 40-60                 | 10              | Social interaktion, generel komfort |

\*ACH = Air Changes per Hour (Luftudskiftninger pr. time)

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

## Climate Quality Calculation Example

Her er et uddrag af koden, der beregner klimakvaliteten for et rum:

```typescript
// Beregn rumklimaparametre baseret på specifikationer
const calculateRoomClimate = (
  size: number,
  capacity: number,
  roomType: string,
  height: number = 2.5 // Standard loftshøjde i meter
): RoomClimateMetrics => {
  // Rumvolumen i kubikmeter
  const roomVolume = size * height;

  // Definer ACH (Air Changes per Hour) baseret på rumtype
  const roomTypeSettings: {
    [key: string]: {
      ach: number;
      idealTemp: [number, number];
      idealHumidity: [number, number];
    };
  } = {
    office: { ach: 8, idealTemp: [20, 22], idealHumidity: [40, 60] },
    meeting_room: { ach: 15, idealTemp: [20, 22], idealHumidity: [40, 60] },
    classroom: { ach: 12, idealTemp: [20, 24], idealHumidity: [40, 60] },
    // ... andre rumtyper
  };

  // Brug typemapping eller default til kontor-indstillinger
  const settings = roomTypeSettings[roomType] || roomTypeSettings.office;

  // Krævet luftstrøm i CFM (Cubic Feet per Minute)
  const roomVolumeInFt3 = roomVolume * 35.3147; // Konverter m³ til ft³
  const requiredAirflow = (roomVolumeInFt3 * settings.ach) / 60;

  // CO₂ belastningsberegning baseret på antal personer
  const co2Load = capacity * 0.005; // CO₂ belastning i m³/min

  return {
    roomVolume,
    requiredAirflow,
    co2Load,
    idealTempRange: settings.idealTemp,
    idealHumidityRange: settings.idealHumidity,
    recommendedACH: settings.ach,
  };
};
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
