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

Office Clima is a Next.js application designed to monitor and manage indoor climate conditions across different offices and rooms. The app allows teams to track temperature and humidity data from IoT devices, visualize climate trends, and make data-driven decisions to improve workplace comfort.

The system combines real-time IoT sensor data with sophisticated climate quality analysis algorithms to provide actionable insights about indoor climate conditions.

<div align="center">
  <img src="docs/images/clima-app-overview.png" alt="Clima App Overview" width="80%">
</div>

## Key Features

### 🏢 Team & Organization Management

- **Team Creation & Management**: Create and manage multiple teams within an organization
- **Role-Based Access Control**: Define admin, manager, and member roles with appropriate permissions
- **Team Invitations**: Send email invitations or generate invitation codes
- **Team Settings**: Configure team preferences for temperature units (°C/°F) and humidity display

### 🚪 Room Management

- **Room Organization**: Create, edit, and delete rooms within team spaces
- **Room Categorization**: Categorize rooms by types (office, meeting room, classroom, etc.)
- **Room Specifications**: Define room size, capacity, and special properties
- **Spatial Visualization**: View rooms on floor plans (coming soon)
- **Status Indicators**: At-a-glance climate quality indicators for each room

### 📱 Device Integration

- **Device Pairing**: Simple QR-code based device pairing system
- **Multi-Protocol Support**: Compatible with various IoT communication protocols
- **Auto-Discovery**: Network discovery of compatible devices (with supported models)
- **Device Health Monitoring**: Track device status, battery levels, and connection quality
- **Calibration Tools**: Advanced sensor calibration capabilities for accurate readings

### 📊 Dashboard & Analytics

- **Interactive Climate Visualization**: Rich, interactive charts showing temperature and humidity trends
- **Room Comparison**: Advanced comparison tools for analyzing multiple rooms simultaneously
- **Climate Quality Assessment**: Sophisticated algorithms for evaluating indoor climate quality
- **Real-time Monitoring**: Live updates of temperature and humidity conditions
- **Data Export**: Export climate data in various formats (CSV, JSON, Excel)
- **Custom Reports**: Generate custom reports with selected metrics and time periods

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

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with Server Components
- **Styling**: Tailwind CSS with custom theme
- **Component Library**: Shadcn/UI (built on Radix UI)
- **Data Visualization**: Recharts for interactive graphs
- **State Management**: React Context API and Hooks
- **Forms**: React Hook Form with Zod validation
- **Authentication**: NextAuth.js integration

### Backend

- **API**: Next.js API routes with route handlers
- **Database ORM**: Prisma ORM for type-safe queries
- **Database**: PostgreSQL for reliable data storage
- **Authentication**: NextAuth.js with multiple providers
- **Validation**: Zod schema validation
- **API Documentation**: OpenAPI specification (coming soon)

### IoT Integration

- **Protocols**: HTTP, MQTT, WebSockets
- **Data Processing**: Real-time and batch processing
- **Device Management**: Custom device registration and management system

## Detailed Database Schema

```mermaid
erDiagram
    User {
        string id PK
        string name
        string email
        string image
        datetime emailVerified
        datetime createdAt
        datetime updatedAt
    }

    Account {
        string id PK
        string userId FK
        string type
        string provider
        string providerAccountId
        string refresh_token
        string access_token
        int expires_at
        string token_type
        string scope
        string id_token
        string session_state
    }

    Session {
        string id PK
        string sessionToken
        string userId FK
        datetime expires
    }

    Team {
        string id PK
        string name
        string description
        string logo
        string temperatureUnit
        string humidityUnit
        datetime createdAt
        datetime updatedAt
    }

    TeamMember {
        string id PK
        string userId FK
        string teamId FK
        string role
        datetime joinedAt
    }

    Room {
        string id PK
        string name
        string description
        string type
        float size
        int capacity
        float ceilingHeight
        string teamId FK
        datetime createdAt
        datetime updatedAt
    }

    Device {
        string id PK
        string name
        string deviceId
        string model
        string firmware
        string status
        string batteryLevel
        string connectionQuality
        string lastSeen
        string roomId FK
        datetime createdAt
        datetime updatedAt
    }

    DeviceReading {
        string id PK
        float temperature
        float humidity
        float co2
        float voc
        float pm25
        datetime createdAt
        string deviceId FK
    }

    User ||--o{ Account : "has"
    User ||--o{ Session : "has"
    User ||--o{ TeamMember : "has"
    Team ||--o{ TeamMember : "has"
    Team ||--o{ Room : "has"
    Room ||--o{ Device : "has"
    Device ||--o{ DeviceReading : "generates"
```

## Climate Assessment Algorithm

The application employs a sophisticated three-tier climate assessment system:

### 1. Basic Climate Assessment

```mermaid
flowchart TD
    A[Temperature & Humidity Readings] --> B[Basic Assessment]
    B --> C{Evaluate Temperature}
    C --> |< 20°C| D[Too Cold]
    C --> |20-24°C| E[Optimal]
    C --> |> 24°C| F[Too Hot]

    B --> G{Evaluate Humidity}
    G --> |< 40%| H[Too Dry]
    G --> |40-60%| I[Optimal]
    G --> |> 60%| J[Too Humid]

    D --> K[Calculate Temperature Deviation]
    E --> K
    F --> K

    H --> L[Calculate Humidity Deviation]
    I --> L
    J --> L

    K --> M[Combined Climate Score]
    L --> M

    M --> N{Determine Quality}
    N --> |Score < 1| O[Excellent]
    N --> |Score < 2.5| P[Good]
    N --> |Score < 4| Q[Moderate]
    N --> |Score < 6| R[Poor]
    N --> |Score >= 6| S[Bad]
```

### 2. Room-Specific Assessment

For rooms with complete metadata (size, type, capacity), the system performs an advanced assessment:

```mermaid
flowchart TD
    A[Room Data] --> B[Calculate Room Volume]
    B --> C[Determine Ideal Parameters]

    D[Room Type] --> C

    C --> E[Calculate Required Airflow]
    C --> F[Calculate CO2 Load]
    C --> G[Set Ideal Temperature Range]
    C --> H[Set Ideal Humidity Range]

    I[Current Readings] --> J[Compare to Ideal Ranges]
    G --> J
    H --> J

    J --> K[Calculate Deviation Score]

    L[Space per Person] --> M[Spatial Quality Factor]
    M --> K

    K --> N[Generate Climate Quality Rating]
    N --> O[Provide Recommendations]
```

### 3. Room Comparison Flow

```mermaid
sequenceDiagram
    participant User
    participant Dashboard
    participant ComparisonEngine
    participant API
    participant Database

    User->>Dashboard: Select rooms to compare
    Dashboard->>Dashboard: Create comparison context
    Dashboard->>ComparisonEngine: Initialize comparison

    loop For each selected room
        ComparisonEngine->>API: Request climate data
        API->>Database: Query historical readings
        Database-->>API: Return readings data
        API-->>ComparisonEngine: Return formatted data
        ComparisonEngine->>ComparisonEngine: Process & normalize data
    end

    ComparisonEngine->>ComparisonEngine: Generate comparison metrics
    ComparisonEngine->>Dashboard: Render comparison charts
    Dashboard->>User: Display visualization

    User->>Dashboard: Adjust comparison settings
    Dashboard->>ComparisonEngine: Update parameters
    ComparisonEngine->>Dashboard: Refresh visualization
    Dashboard->>User: Show updated comparison
```

## API Endpoints Reference

### Authentication

| Endpoint                  | Method  | Description                          | Authentication |
| ------------------------- | ------- | ------------------------------------ | -------------- |
| `/api/auth/[...nextauth]` | Various | NextAuth.js authentication endpoints | None           |
| `/api/auth/register`      | POST    | Register new user                    | None           |
| `/api/auth/session`       | GET     | Get current session                  | None           |

### Teams

| Endpoint                      | Method | Description                     | Authentication         |
| ----------------------------- | ------ | ------------------------------- | ---------------------- |
| `/api/teams`                  | GET    | List all teams for current user | Required               |
| `/api/teams`                  | POST   | Create a new team               | Required               |
| `/api/teams/:teamId`          | GET    | Get team details                | Required & Team Member |
| `/api/teams/:teamId`          | PUT    | Update team details             | Required & Team Admin  |
| `/api/teams/:teamId`          | DELETE | Delete a team                   | Required & Team Admin  |
| `/api/teams/invite`           | POST   | Generate invite code            | Required & Team Admin  |
| `/api/teams/join`             | POST   | Join team with invite code      | Required               |
| `/api/teams/:teamId/members`  | GET    | List team members               | Required & Team Member |
| `/api/teams/:teamId/settings` | GET    | Get team settings               | Required & Team Member |
| `/api/teams/:teamId/settings` | PUT    | Update team settings            | Required & Team Admin  |

### Rooms

| Endpoint             | Method | Description                   | Authentication         |
| -------------------- | ------ | ----------------------------- | ---------------------- |
| `/api/rooms`         | GET    | List rooms (filter by teamId) | Required & Team Member |
| `/api/rooms`         | POST   | Create a new room             | Required & Team Admin  |
| `/api/rooms/:roomId` | GET    | Get room details              | Required & Team Member |
| `/api/rooms/:roomId` | PUT    | Update room details           | Required & Team Admin  |
| `/api/rooms/:roomId` | DELETE | Delete a room                 | Required & Team Admin  |

### Devices

| Endpoint                       | Method | Description                           | Authentication         |
| ------------------------------ | ------ | ------------------------------------- | ---------------------- |
| `/api/devices`                 | GET    | List devices (filter by roomId)       | Required & Team Member |
| `/api/devices`                 | POST   | Register a new device                 | Required & Team Admin  |
| `/api/devices/:deviceId`       | GET    | Get device details                    | Required & Team Member |
| `/api/devices/:deviceId`       | PUT    | Update device details                 | Required & Team Admin  |
| `/api/devices/:deviceId`       | DELETE | Delete a device                       | Required & Team Admin  |
| `/api/devices/pair`            | POST   | Pair a device with a room             | Required & Team Admin  |
| `/api/devices/check/:deviceId` | GET    | Check device status                   | Required & Team Member |
| `/api/devices/readings`        | GET    | Get device readings (various filters) | Required & Team Member |
| `/api/devices/readings`        | POST   | Submit device reading                 | Device Auth / API Key  |
| `/api/devices/readings/stats`  | GET    | Get aggregated reading statistics     | Required & Team Member |

## Dashboard Features

<div align="center">
  <img src="docs/images/dashboard-overview.png" alt="Dashboard Overview" width="80%">
</div>

### Interactive Climate Visualization

The dashboard provides rich, interactive visualizations of climate data:

```typescript
// Example component structure for climate visualization
const ClimateChart: React.FC<{
  roomId: string;
  period: "day" | "week" | "month";
}> = ({ roomId, period }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Fetch climate data for the specified room and period
    const fetchData = async () => {
      const response = await fetch(
        `/api/devices/readings/stats?roomId=${roomId}&period=${period}`
      );
      const data = await response.json();
      setChartData(data.timeSeriesData);
    };

    fetchData();
  }, [roomId, period]);

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={chartData} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" orientation="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          stroke="var(--color-temperature)"
          fill="url(#colorTemp)"
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="humidity"
          stroke="var(--color-humidity)"
          fill="url(#colorHumid)"
        />
      </AreaChart>
    </ChartContainer>
  );
};
```

### Room Comparison System

The room comparison system allows users to:

1. **Select Multiple Rooms**: Choose rooms to compare from the team's room list
2. **Customize Visualization**: Configure display options for comparison charts
3. **Analyze Differences**: Identify patterns and anomalies between rooms
4. **Export Comparison Data**: Save or share comparison results

### Climate Quality Assessment

The dashboard provides detailed climate quality assessment with:

1. **Quality Indicators**: Visual indicators of climate quality (Excellent to Bad)
2. **Parameter Breakdown**: Individual assessment of temperature and humidity
3. **Ideal Range Display**: Show ideal ranges for the specific room type
4. **Recommendations**: Actionable suggestions for improving climate quality

## Room Types & Recommended Parameters

| Room Type    | Temperature Range (°C) | Humidity Range (%) | Recommended ACH\* | Primary Considerations                 |
| ------------ | ---------------------- | ------------------ | ----------------- | -------------------------------------- |
| Office       | 20-22                  | 40-60              | 8                 | Productivity, comfort                  |
| Meeting Room | 20-22                  | 40-60              | 15                | Concentration, comfort                 |
| Classroom    | 20-24                  | 40-60              | 12                | Learning environment, alertness        |
| Conference   | 20-22                  | 40-60              | 12                | Comfort, focus                         |
| Hospital     | 20-22                  | 40-60              | 15                | Health, infection control              |
| Laboratory   | 20-22                  | 40-60              | 20                | Precision work, equipment needs        |
| Gym          | 18-22                  | 40-60              | 20                | Physical activity, cooling             |
| Restaurant   | 18-22                  | 40-60              | 20                | Dining comfort, food preservation      |
| Library      | 20-22                  | 40-60              | 12                | Material preservation, reading comfort |
| Common Area  | 20-22                  | 40-60              | 10                | Social interaction, general comfort    |

\*ACH = Air Changes per Hour

## Installation & Setup

### Prerequisites

- Node.js 18+ (recommended: use latest LTS version)
- PostgreSQL 13+ database
- npm, yarn, or bun package manager

### Step-by-Step Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/clima-app.git
cd clima-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
bun install
```

3. **Set up environment variables**

Create a `.env` file with the following values:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/clima_db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars-long"

# OAuth Providers (Optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Application Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
DEVICE_API_KEY="your-secret-device-api-key"
```

4. **Create database and run migrations**

```bash
# Create the database (if not already created)
createdb clima_db

# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

5. **Seed the database with sample data (optional)**

```bash
npx prisma db seed
```

6. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

7. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Guidelines

### Code Organization

The project follows a modular architecture:

```
clima-app/
├── app/                  # Next.js App Router files
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Dashboard and main app routes
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components (Shadcn/UI)
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility functions and shared code
│   ├── utils.ts          # General utilities
│   └── validators.ts     # Zod validators
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Migration files
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

### Working with the Database

#### Create a new migration

When changing the database schema:

```bash
# After modifying prisma/schema.prisma
npx prisma migrate dev --name descriptive-name
```

#### Verify database state

```bash
# Check the database structure
npx prisma db pull

# View data in the Prisma Studio UI
npx prisma studio
```

### API Development Patterns

When creating new API endpoints, follow this structure:

```typescript
// File: app/api/[resource]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET handler example
export async function GET(request: Request) {
  // Get auth session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract query parameters
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");

  // Validate parameters
  if (!teamId) {
    return NextResponse.json(
      { error: "Missing required parameter: teamId" },
      { status: 400 }
    );
  }

  try {
    // Check permissions
    const isMember = await prisma.teamMember.findFirst({
      where: {
        teamId,
        userId: session.user.id,
      },
    });

    if (!isMember) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    // Fetch data
    const data = await prisma.room.findMany({
      where: { teamId },
      include: {
        _count: {
          select: { devices: true },
        },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Climate Quality Calculation Example

Here's an excerpt of the code that calculates room climate quality:

```typescript
// Calculate room climate metrics based on specifications
const calculateRoomClimate = (
  size: number,
  capacity: number,
  roomType: string,
  height: number = 2.5 // Default ceiling height in meters
): RoomClimateMetrics => {
  // Room volume in cubic meters
  const roomVolume = size * height;

  // Define ACH (Air Changes per Hour) based on room type
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
    // ... other room types
  };

  // Use type mapping or default to office settings
  const settings = roomTypeSettings[roomType] || roomTypeSettings.office;

  // Required airflow in CFM (Cubic Feet per Minute)
  const roomVolumeInFt3 = roomVolume * 35.3147; // Convert m³ to ft³
  const requiredAirflow = (roomVolumeInFt3 * settings.ach) / 60;

  // CO₂ load calculation based on number of people
  const co2Load = capacity * 0.005; // CO₂ load in m³/min

  return {
    roomVolume,
    requiredAirflow,
    co2Load,
    idealTempRange: settings.idealTemp,
    idealHumidityRange: settings.idealHumidity,
    recommendedACH: settings.ach,
  };
};

// Assess room climate quality based on current readings and room specifications
const assessRoomClimate = (
  temperature: number,
  humidity: number,
  room: RoomData | null
): ClimateQuality => {
  // If we don't have room data, use basic assessment
  if (!room || room.size === null || room.capacity === null || !room.type) {
    return assessBasicClimate(temperature, humidity);
  }

  try {
    // Calculate detailed room climate metrics
    const roomMetrics = calculateRoomClimate(
      room.size,
      room.capacity,
      room.type
    );

    // Get ideal ranges
    const [tempMin, tempMax] = roomMetrics.idealTempRange;
    const [humidMin, humidMax] = roomMetrics.idealHumidityRange;

    // Calculate deviation from ideal ranges
    let tempDeviation = 0;
    if (temperature < tempMin) {
      tempDeviation = tempMin - temperature;
    } else if (temperature > tempMax) {
      tempDeviation = temperature - tempMax;
    }

    let humidDeviation = 0;
    if (humidity < humidMin) {
      humidDeviation = (humidMin - humidity) / 5;
    } else if (humidity > humidMax) {
      humidDeviation = (humidity - humidMax) / 5;
    }

    // Factor in room size per person for air quality
    const spacePerPerson = room.size / room.capacity;
    const spaceDeviation = Math.max(0, 4 - spacePerPerson) / 2;

    // Combine deviations for overall score (lower is better)
    const combinedDeviation = tempDeviation + humidDeviation + spaceDeviation;

    // Determine climate quality based on combined deviation
    let result: ClimateQuality;

    if (combinedDeviation < 1) {
      result = {
        status: "excellent",
        emoji: "😊",
        message: "Excellent Climate",
        color: "text-green-500",
      };
    } else if (combinedDeviation < 2.5) {
      result = {
        status: "good",
        emoji: "🙂",
        message: "Good Climate",
        color: "text-green-400",
      };
    }
    // ... other climate quality levels

    // Add detailed metrics to the result
    result.details = {
      roomVolume: roomMetrics.roomVolume,
      requiredAirflow: Math.round(roomMetrics.requiredAirflow),
      co2Load: parseFloat(roomMetrics.co2Load.toFixed(3)),
      idealTempRange: roomMetrics.idealTempRange,
      idealHumidityRange: roomMetrics.idealHumidityRange,
    };

    return result;
  } catch (error) {
    // Fallback to basic assessment if something goes wrong
    return assessBasicClimate(temperature, humidity);
  }
};
```

## Future Development Roadmap

- **Q3 2023**: Enhanced room comparison tools, expanded device support
- **Q4 2023**: Floor plan visualization, advanced reporting features
- **Q1 2024**: AI-powered climate optimization suggestions
- **Q2 2024**: Mobile application for iOS and Android
- **Q3 2024**: Integration with building management systems (BMS)

## Contributing

We welcome contributions to the Office Clima project! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get involved.

## License

[MIT License](LICENSE)

## Credits

Developed by the Office Clima team for the indoor climate monitoring needs of modern workplaces.

---

<div align="center">
  <p>
    <a href="https://github.com/yourusername/clima-app">GitHub</a> •
    <a href="https://yourwebsite.com">Website</a> •
    <a href="mailto:contact@yourcompany.com">Contact</a>
  </p>
</div>
