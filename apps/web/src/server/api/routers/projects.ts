import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { projects } from "@repo/db/schema";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(projects);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(projects)
        .where(({ eq }) => eq(projects.id, input.id));
      return result[0];
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        status: z.string().default("active"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(projects).values(input);
    }),
}); 