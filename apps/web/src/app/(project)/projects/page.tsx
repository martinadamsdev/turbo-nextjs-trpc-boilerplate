'use client';

import { CreateProjectForm } from "../components/CreateProjectForm";
import { trpc } from "#/lib/providers/trpc-provider";
import type { AppRouter } from "#/server/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Project = RouterOutputs["projects"]["getAll"][number];

export default function ProjectsPage() {
  const { data: projects, isLoading } = trpc.projects.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>
      
      {/* Create Project Form */}
      <CreateProjectForm />

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project: Project) => (
          <div
            key={project.id}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <h2 className="mb-2 text-xl font-semibold">{project.name}</h2>
            <p className="mb-4 text-muted-foreground">{project.description}</p>
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-sm ${
                  project.status === "active"
                    ? "bg-green-100 text-green-800"
                    : project.status === "in-progress"
                    ? "bg-blue-100 text-blue-800"
                    : project.status === "completed"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {project.status}
              </span>
              <span className="text-sm text-muted-foreground">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 