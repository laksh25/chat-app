# ChatApp — Real-time Chat Application

A real-time chat application built with **Next.js 14**, **Node.js**, **GraphQL (Apollo)**, **Socket.io**, **MongoDB**, and **Redis**.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand, Apollo Client |
| Backend | Node.js, Express, Apollo Server 4, Socket.io, TypeScript |
| API | GraphQL (queries/mutations/subscriptions) |
| Database | MongoDB Atlas + Redis (Upstash) |
| Auth | NextAuth.js v5 + JWT + Google OAuth |
| Storage | Cloudinary |
| DevOps | Docker, GitHub Actions, Vercel, Railway |

## Project Structure

```
chat-app/
├── client/       # Next.js frontend (deploy to Vercel)
├── server/       # Node.js backend  (deploy to Railway)
└── shared/       # Shared enums, constants, utilities
```

## Getting Started

### Prerequisites
- Node.js >= 20
- pnpm >= 9
- Docker (for local MongoDB + Redis)

### 1. Clone & install
```bash
git clone https://github.com/laksh25/chat-app.git
cd chat-app
pnpm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Fill in your values in .env
```

### 3. Start databases
```bash
docker-compose up -d
```

### 4. Build shared package
```bash
pnpm --filter @chat-app/shared build
```

### 5. Start development servers
```bash
pnpm dev    # starts both client (port 3000) and server (port 4000)
```

### 6. Generate GraphQL types (after server is running)
```bash
pnpm codegen
```

## Deployment

| Service | Platform | Root Directory |
|---|---|---|
| Client (Next.js) | Vercel | `client/` |
| Server (Node.js) | Railway | `server/` |
| MongoDB | MongoDB Atlas | — |
| Redis | Upstash | — |

## Architecture Highlights

- **GraphQL Subscriptions** for real-time messaging
- **Socket.io** exclusively for typing indicators and presence
- **DataLoader** for N+1 query prevention
- **Redis Pub/Sub** for Socket.io multi-instance scaling
- **Cursor-based pagination** for message history
- **graphql-code-generator** for auto-generated TypeScript types
- **pnpm workspaces** monorepo
