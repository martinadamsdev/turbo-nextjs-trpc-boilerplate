import { seed } from "drizzle-seed";
import { db } from "./client";
import * as schema from "./schema";
import { projects } from "./schema";

async function main() {
  console.log("🌱 Seeding database...");

  // Sample project data for seeding
  const projectData = [
    {
      name: "E-commerce Platform",
      description: "A modern e-commerce platform with real-time inventory management",
      status: "active",
    },
    {
      name: "Task Management App",
      description: "A collaborative task management application for teams",
      status: "in-progress",
    },
    {
      name: "AI Chat Assistant",
      description: "An AI-powered chat assistant for customer support",
      status: "planning",
    },
    {
      name: "Mobile Banking App",
      description: "A secure mobile banking application with biometric authentication",
      status: "active",
    },
    {
      name: "Social Media Dashboard",
      description: "Analytics dashboard for social media management",
      status: "completed",
    },
  ];

  console.log("📦 Seeding projects...");
  // Insert each project into the database
  for (const project of projectData) {
    await db.insert(projects).values(project);
  }

  console.log("✅ Seeding completed!");
}

main().catch((e) => {
  console.error("❌ Seeding failed!");
  console.error(e);
  process.exit(1);
});
