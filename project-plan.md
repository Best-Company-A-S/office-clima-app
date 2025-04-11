# Clima App Restructuring Plan

## Architecture Overview

The new Clima App will be built with a modern, scalable architecture using:

- **Next.js 14+ with App Router**: For server components and improved routing
- **TypeScript**: For type safety and better developer experience
- **Prisma**: For database access with improved schema
- **NextAuth.js**: Enhanced with multiple providers and role-based access
- **Tailwind CSS & shadcn/ui**: For consistent and beautiful UI
- **Tanstack React Query**: For efficient data fetching and state management
- **Zod**: For robust validation across the application

## Directory Structure

```
/app
  /(auth)                # Authentication routes
    /login
    /register
    /forgot-password
  /(dashboard)           # Main dashboard area
    /overview            # Main dashboard view
    /teams               # Team management
    /devices             # Device management & monitoring
    /rooms               # Room management
    /analytics           # Advanced analytics
    /alerts              # Alert configuration and history
    /settings            # Application settings
    /admin               # Admin panel (for super users)
  /api                   # API routes with improved organization
    /auth                # Authentication endpoints
    /teams               # Team-related endpoints
    /devices             # Device-related endpoints
    /readings            # Climate readings endpoints
    /firmware            # Firmware management endpoints
    /webhooks            # Webhook integration endpoints
    /analytics           # Analytics data endpoints
    /admin               # Admin-only endpoints
/components              # UI components
  /dashboard             # Dashboard-specific components
  /devices               # Device-related components
  /analytics             # Analytics components
  /auth                  # Authentication components
  /common                # Shared components
  /layouts               # Layout components
  /ui                    # Base UI components
/lib                     # Utility functions and shared logic
  /api                   # API client utilities
  /auth                  # Authentication utilities
  /db                    # Database utilities
  /validation            # Zod schemas and validation logic
  /utils                 # General utilities
/hooks                   # Custom React hooks
/providers               # Context providers
/public                  # Static assets
/styles                  # Global styles
/types                   # TypeScript type definitions
/prisma                  # Database schema and migrations
```

## Authentication System

- Multi-provider authentication (GitHub, Google, Email/Password)
- Role-based access control (Admin, Team Owner, Team Member, Viewer)
- Enhanced session management
- Secure password recovery and account management
- Team invitation system with secure tokens

## Dashboard Improvements

- Modern, responsive design with improved UX
- Real-time data visualization with WebSockets
- Advanced filtering and search capabilities
- Customizable widgets and layouts
- Dark/light mode support
- Responsive design for all device sizes

## Device Management

- Comprehensive device inventory management
- Enhanced firmware update process
- Device health monitoring and alerting
- Batch operations for multiple devices
- Detailed device history and audit logs
- QR code-based device pairing

## Analytics and Reporting

- Advanced climate data analytics
- Custom report generation
- Data export options (CSV, JSON, Excel)
- Comparative analysis between rooms/devices
- Historical trend analysis
- Anomaly detection

## Admin Features

- User management interface
- System-wide settings
- Audit logs
- Usage statistics
- Service health monitoring

## Implementation Plan

1. **Phase 1: Core Infrastructure**

   - Set up new project structure
   - Implement basic authentication
   - Create database schema
   - Set up API foundation

2. **Phase 2: Dashboard and Device Management**

   - Build core dashboard components
   - Implement device management features
   - Create room management interface
   - Develop basic analytics

3. **Phase 3: Advanced Features**

   - Implement advanced analytics
   - Add alerting system
   - Create admin dashboard
   - Develop reporting features

4. **Phase 4: Polish and Optimization**
   - Performance optimization
   - UI/UX improvements
   - Testing and bug fixes
   - Documentation
