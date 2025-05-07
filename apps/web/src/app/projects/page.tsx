import { api } from "~/trpc/server";

export default async function ProjectsPage() {
  const projects = await api.projects.getAll.query();

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
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