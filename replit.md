# SAT Practice Test Application

## Overview

This is a digital SAT Practice Test application focusing on the Reading and Writing section. The application provides a complete testing environment with start code verification, question navigation, break management, and work review capabilities. Built with a modern React frontend and Express backend, it simulates the SAT testing experience with features like fullscreen mode, question marking, progress tracking, and optional Telegram notifications for test monitoring.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript using Vite as the build tool and development server.

**UI Component System**: Shadcn UI based on Radix UI primitives, providing accessible, customizable components following Material Design principles. The component library includes forms, dialogs, navigation menus, progress indicators, and other essential UI elements. All components are styled using Tailwind CSS with a custom design system defined in the theme configuration.

**Design System**: Based on Material Design principles with custom specifications focused on clarity and minimal distraction. Uses Inter or Roboto fonts via Google Fonts CDN. Color scheme uses HSL-based CSS variables for theming support (light/dark modes). Spacing follows Tailwind's systematic scale (2, 4, 6, 8, 12, 16, 20, 24). Responsive design with mobile-first approach and specific breakpoints for desktop layouts.

**State Management**: Local component state using React hooks (useState, useEffect, useCallback). Application-level state is managed in the main App component and passed down as props. No external state management library is used, keeping the architecture simple for this focused application.

**Client-Side Routing**: Single-page application with conditional page rendering based on application state. Pages include: start code entry, quiz interface, check work review, and break screen. Navigation is controlled through state changes rather than URL routing.

**Data Fetching**: TanStack Query (React Query) for server state management, caching, and mutations. Custom API request wrapper handles authentication with credentials and standardized error handling.

**Form Handling**: React Hook Form with Zod schema validation for type-safe form inputs, particularly for the start code entry.

### Backend Architecture

**Runtime**: Node.js with Express.js framework handling HTTP requests and API endpoints.

**Development vs Production**: Development mode uses Vite's middleware for hot module replacement and live reloading. Production mode serves pre-built static assets from the dist/public directory. Build process uses esbuild to bundle server code with selective dependency bundling (allowlist) to optimize cold start times.

**API Structure**: RESTful API endpoints registered through a centralized routes module. Current endpoint: POST /api/start-code for test session initialization with start code validation.

**Session Management**: In-memory storage implementation (MemStorage class) provides user and session management without database persistence. Designed to be easily swapped with database-backed storage through the IStorage interface.

**Logging**: Custom logging middleware captures request method, path, status code, response time, and response data for API endpoints. Formatted timestamps in 12-hour format for readability.

### Data Storage

**Current Implementation**: In-memory storage using JavaScript Map objects for users and test sessions. Data persists only during server runtime and is lost on restart.

**Schema Design**: TypeScript interfaces define the data models:
- User: id, username, and extensible user properties
- TestSession: tracks session ID, start code, current question, question statuses, timestamps, break status
- Question: contains question text, passage (optional), multiple choice options, and correct answer
- QuestionStatus: tracks answered state, review marking, and selected answer per question

**Database Ready**: Drizzle ORM configured for PostgreSQL with migrations support. Schema definitions use Drizzle with Zod integration for validation. Connection string expected via DATABASE_URL environment variable. Not currently implemented but infrastructure is in place.

### Authentication & Authorization

**Current State**: Minimal authentication. Start code validation is the primary access control mechanism. Sessions are created upon valid start code entry.

**Extensibility**: Infrastructure includes user model and storage interface suggesting future authentication features. No password hashing, JWT, or session middleware currently implemented.

### External Dependencies

**UI Framework**: 
- Radix UI primitives for accessible component foundations
- Tailwind CSS for utility-first styling
- Class Variance Authority (CVA) for component variant management
- clsx and tailwind-merge for conditional class composition

**Data Management**:
- TanStack Query for server state
- React Hook Form for form handling
- Zod for schema validation and type safety
- date-fns for date manipulation

**Database (configured but not active)**:
- Drizzle ORM with PostgreSQL dialect
- connect-pg-simple for session store (not currently used)

**External Services**:
- Telegram Bot API for optional notifications when start codes are entered (requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables)
- Google Fonts CDN for typography (Inter, Roboto, DM Sans, Fira Code, Geist Mono, Architects Daughter)

**Development Tools**:
- Vite with React plugin for fast development experience
- Replit-specific plugins for error overlay, cartographer, and dev banner
- TypeScript for type safety across the stack
- ESBuild for production builds

**Testing Content**: Sample SAT Reading and Writing questions are hardcoded in the shared schema file. Questions include passage-based comprehension and standalone grammar/writing questions with multiple choice answers.