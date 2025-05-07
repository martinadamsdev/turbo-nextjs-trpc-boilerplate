# Turbo Next.js tRPC Boilerplate

A modern monorepo boilerplate for building fullstack applications with Next.js, tRPC, Drizzle ORM, and PostgreSQL. Includes a ready-to-use project structure, database integration, and best practices for scalable development.

## Tech Stack
- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [pnpm](https://pnpm.io/) (monorepo management)
- [TypeScript](https://www.typescriptlang.org/)

## Monorepo Structure
```
.
├── apps
│   └── web                # Next.js frontend app
├── packages
│   └── db                 # Database schema, client, and seed scripts
├── docker-compose.yaml    # For local PostgreSQL
├── pnpm-workspace.yaml    # pnpm workspace config
└── README.md
```

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 8
- Docker (for local database)

### Setup
1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Start PostgreSQL with Docker**
   ```bash
   docker-compose up -d
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env` in the root and fill in your database URL if needed.
4. **Push database schema and seed data**
   ```bash
   pnpm --filter @repo/db db:push && pnpm --filter @repo/db db:seed
   ```
5. **Run the development server**
   ```bash
   pnpm dev
   ```

## Usage
- Access the app at [http://localhost:3000](http://localhost:3000)
- Projects and dashboard are available in the sidebar
- Use tRPC for type-safe API calls between frontend and backend

## Scripts
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages

## License
MIT 