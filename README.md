# Office Clima - Indoor Climate Monitoring App

## Project Overview

Office Clima is a Next.js application designed to monitor and manage indoor climate conditions across different offices and rooms. The app allows teams to track temperature and humidity data from IoT devices, gather feedback through surveys, and make data-driven decisions to improve workplace comfort.

## Features

### Team Management

- Create and manage teams with multiple members
- Send invites to team members
- Join teams via invitation codes

### Room Management

- Create and organize rooms within teams
- Assign climate monitoring devices to specific rooms
- Track climate conditions per room

### Device Integration

- Pair IoT devices with the system
- Monitor real-time temperature and humidity readings
- View historical climate data and trends

### User Feedback

- Create and distribute climate satisfaction surveys
- Collect user feedback about comfort levels
- Review survey responses and suggestions for improvement

## Tech Stack

### Frontend

- Next.js 15 with App Router
- React 19
- Tailwind CSS
- Shadcn/UI components (Radix UI)
- Recharts for data visualization
- NextAuth for authentication

### Backend

- Next.js API routes
- Prisma ORM
- PostgreSQL database

### Monitoring & Error Tracking

- Sentry for error tracking, performance monitoring, and logging
- Structured logging with breadcrumbs and context for debugging
- Automated error capturing across client and server

## Database Schema

The application uses the following primary models:

- `Team`: Organizations with members who can access rooms and devices
- `Room`: Physical spaces monitored for climate conditions
- `Device`: IoT hardware that collects climate data
- `DeviceReading`: Time-series data for temperature and humidity
- `Survey`: Feedback collection tools for occupant comfort
- `SurveyResponse`: User responses to climate surveys

## API Endpoints

### Authentication

- `/api/auth/[...nextauth]`: Authentication endpoints using NextAuth

### Teams

- `/api/teams`: CRUD operations for teams
- `/api/teams/create`: Create a new team
- `/api/teams/invite`: Generate team invites
- `/api/teams/join`: Join a team with an invite code
- `/api/teams/[teamId]`: Team-specific operations

### Rooms

- `/api/rooms`: List and manage rooms
- `/api/rooms/create`: Create a new room
- `/api/rooms/[roomId]`: Room-specific operations

### Devices

- `/api/devices/pair`: Pair devices with the system
- `/api/devices/check`: Verify device status
- `/api/devices/readings`: Record and retrieve device readings
- `/api/device/register`: Register and manage devices

### Surveys

- `/api/surveys`: Create and manage climate surveys
- `/api/surveys/[surveyId]`: Survey-specific operations

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use latest LTS version)
- PostgreSQL database

### Installation

1. Clone the repository

```bash
git clone https://github.com/Best-Company-A-S/office-clima-app.git
cd clima-app
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

3. Set up environment variables
   Create a `.env` file with the following values:

```
DATABASE_URL="postgresql://username:password@localhost:5432/clima_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
SENTRY_DSN="your-sentry-dsn"
```

4. Run database migrations

```bash
npx prisma migrate dev
```

5. Start the development server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Workflow

### Database Changes

1. Update the schema in `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description-of-changes`
3. Update your API routes or server components as needed

### Adding New Components

1. Create component files in `components/` directory
2. Follow existing design patterns and use Shadcn/UI components

### API Development

1. Create new routes in the appropriate directory under `app/api/`
2. Use Prisma client for database operations
3. Implement proper authentication and validation
4. Use Sentry for error tracking and monitoring

### Logging Best Practices

1. Use Sentry breadcrumbs for tracking application flow
2. Add context to Sentry events for better diagnostics
3. Capture exceptions with Sentry instead of console.error
4. Structure logs with categories and severity levels

## Deployment

The application is configured for deployment on Vercel:

1. Push to your GitHub repository
2. Connect repository to Vercel
3. Set environment variables in the Vercel dashboard
   - Include Sentry DSN and other required configuration
4. Deploy

## Monitoring

The application uses Sentry for error tracking and performance monitoring:

1. View errors and exceptions in the Sentry dashboard
2. Track performance metrics and identify bottlenecks
3. Monitor release health and user experience
4. Set up alerts for critical issues

## License

[MIT License](LICENSE)
