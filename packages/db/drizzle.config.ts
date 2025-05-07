import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Helper function to redact sensitive information from database URL
const redacted = (str: string) => {
  return str
    .replace(/:\/\/(.*?):(.*?)@/, "://***:***@")
    .replace(/@(.+?):/, "@***:");
};

// Default database URL for development environment
const defaultDatabaseUrl = "postgres://postgres:postgres@localhost:5433/postgres";
const databaseUrl = process.env.DATABASE_URL || defaultDatabaseUrl;

console.log(`Initializing database with ${redacted(databaseUrl)}`);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
