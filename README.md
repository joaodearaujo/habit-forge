# HabitForge

Full-stack routine management application built with **React + TypeScript** and a **Java + Spring Boot REST API**.

---

## Overview

Routine Manager allows authenticated users to organize their activities into:

```text
Routine
 └── Group
      └── Task
```

Users can create, edit and delete routines, groups and tasks, track task completion, and organize tasks by category.

The project is also being used as a practical study of **software architecture, separation of concerns, dependency direction, and maintainable full-stack development**.

---

## Features

- User authentication
- Routine, group and task management
- Inline task editing
- Task completion with optimistic UI
- Task categories
- Expandable task descriptions
- Server-state caching and synchronization
- Form validation
- Automated tests

---

## Tech Stack

### Frontend

| Technology     | Purpose                             |
| -------------- | ----------------------------------- |
| React          | UI                                  |
| TypeScript     | Static typing                       |
| Vite           | Build tooling                       |
| TanStack Query | Server state, caching and mutations |
| React Router   | Routing                             |
| Zod            | Validation                          |
| Tailwind CSS   | Styling                             |
| Vitest         | Testing                             |

### Backend

| Technology                  | Purpose                          |
| --------------------------- | -------------------------------- |
| Java                        | Backend language                 |
| Spring Boot                 | REST API                         |
| Spring Security             | Authentication and authorization |
| Spring Data JPA / Hibernate | Persistence                      |
| PostgreSQL                  | Database                         |

The backend is maintained as a separate application.

---

## Architecture

The frontend follows a **feature-oriented architecture** with explicit dependency boundaries.

```text
React UI
   ↓
Feature Hooks
   ↓
TanStack Query
   ↓
API Client
   ↓ HTTP
Spring Boot API
   ↓
Application / Persistence
   ↓
PostgreSQL
```

A task completion request, for example:

```text
Task
 ↓
useTasks
 ↓
useToggleIsCompletedTask
 ↓
TanStack Query
 ↓
api.ts
 ↓
Spring Boot API
```

Each layer owns a specific responsibility. UI components do not need to know how HTTP requests, caching, or persistence are implemented.

---

## Frontend Structure

```text
src/
├── components/          # Application-wide UI
├── context/             # Global React contexts
├── features/
│   ├── auth/            # Authentication
│   └── routine/
│       ├── routine/     # Routine domain
│       ├── group/       # Group domain
│       ├── task/        # Task domain
│       ├── components/  # Routine feature shared UI
│       └── hooks/       # Routine feature shared hooks
│
└── shared/
    ├── api/             # HTTP infrastructure
    ├── components/      # Generic UI
    └── hooks/           # Generic hooks
```

### Task example

```text
task/
├── components/
│   ├── Task.tsx
│   ├── TaskHeader.tsx
│   ├── TaskDescription.tsx
│   └── TaskControls.tsx
├── hooks/
│   ├── useTasks.ts
│   └── useToggleIsCompletedTask.ts
├── mappers/
└── types/
```

---

## Key Engineering Decisions

### Server state vs UI state

TanStack Query is responsible for server state:

- API data
- cache
- queries
- mutations
- invalidation

React state is used for local UI concerns such as:

- expanded descriptions
- editing state
- form state

This avoids keeping unnecessary duplicate copies of server data inside components.

### DTO to Domain

API responses are separated from frontend domain models:

```text
API Response
     ↓
   DTO
     ↓
  Mapper
     ↓
Domain Model
     ↓
    UI
```

This keeps API contracts from leaking directly into the presentation layer.

### Optimistic Updates

Task completion uses an optimistic update:

```text
User action
    ↓
Update cache immediately
    ↓
UI responds
    ↓
Backend request
    ├── success → synchronize
    └── error   → rollback
```

The backend remains the authoritative source of truth.

### Generic vs feature-specific logic

Generic CRUD behavior is centralized in reusable hooks.

Behavior with domain-specific requirements stays inside the feature.

```text
useCrudOperations
        ↓
generic CRUD behavior

useToggleIsCompletedTask
        ↓
Task-specific optimistic behavior
```

---

## Authentication

Authentication is handled by the backend using **Spring Security**.

```text
Login
  ↓
Spring Security
  ↓
Authenticated session
  ↓
AuthContext
  ↓
Protected application
```

The frontend communicates with the authenticated REST API through a centralized HTTP client.

---

## Data Flow

### Read

```text
PostgreSQL
    ↓
Spring Boot
    ↓
HTTP Response
    ↓
API Client
    ↓
TanStack Query
    ↓
Mapper
    ↓
Domain Model
    ↓
React UI
```

### Write

```text
React UI
    ↓
Feature Hook
    ↓
TanStack Query mutation
    ↓
API Client
    ↓
Spring Boot
    ↓
Service / Repository
    ↓
PostgreSQL
```

---

## Running Locally

### Requirements

- Node.js
- npm
- Java
- PostgreSQL
- Backend running locally

### Frontend

```bash
npm install
npm run dev
```

### Environment

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080
```

Start the Spring Boot backend separately according to its configuration.

---

## Scripts

```bash
npm run dev       # Development
npm run build     # Production build
npm test          # Tests
npm run lint      # ESLint
npm run preview   # Production preview
```

---

## What This Project Demonstrates

- React and TypeScript development
- Java and Spring Boot integration
- REST API consumption
- Authentication with Spring Security
- Server-state management with TanStack Query
- Optimistic UI updates
- API abstraction
- DTO/domain separation
- Feature-oriented architecture
- Separation of concerns
- Type-safe validation
- Automated testing

---

## Project Status

In active development.

The application and architecture continue to evolve as new requirements and architectural improvements are introduced.

---

## Author

**João Pedro Araújo**

Focused on:

**Java · Spring Boot · React · TypeScript · JavaScript · Software Architecture**
