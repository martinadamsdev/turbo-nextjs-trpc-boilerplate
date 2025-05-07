'use client';

import { useState } from "react";
import { trpc } from "#/lib/providers/trpc-provider";

export function CreateProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const utils = trpc.useUtils();
  const createProject = trpc.projects.create.useMutation({
    onSuccess: () => {
      // Reset form
      setName("");
      setDescription("");
      setStatus("active");
      // Refresh projects list
      utils.projects.getAll.invalidate();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createProject.mutate({ name, description, status });
      }}
      className="mb-8 space-y-4 rounded-lg border bg-card p-6 shadow-sm"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Project Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="active">Active</option>
          <option value="in-progress">In Progress</option>
          <option value="planning">Planning</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={createProject.isLoading}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
      >
        {createProject.isLoading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
} 