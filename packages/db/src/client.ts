import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Default database URL for development
const defaultDatabaseUrl = "postgres://postgres:postgres@localhost:5433/postgres";
const databaseUrl = process.env.DATABASE_URL || defaultDatabaseUrl;

// Create database connection
const client = postgres(databaseUrl, {
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create database instance
export const db = drizzle(client, { schema });
