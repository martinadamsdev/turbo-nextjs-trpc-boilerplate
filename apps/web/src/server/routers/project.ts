import { z } from "zod";
import { router, publicProcedure } from "../trpc/init";
import { db } from "@repo/db/client";
import { projects } from "@repo/db/schema";

export const projectsRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(projects);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [project] = await db
        .select()
        .from(projects)
        .where(projects.id.equals(input.id));
      return project;
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        status: z.enum(["active", "in-progress", "planning", "completed"]),
      }),
    )
    .mutation(async ({ input }) => {
      const [project] = await db
        .insert(projects)
        .values({
          name: input.name,
          description: input.description,
          status: input.status,
        })
        .returning();
      return project;
    }),
}); 