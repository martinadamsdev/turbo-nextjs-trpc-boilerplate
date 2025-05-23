import { createContext } from "../trpc/context";
import { createCallerFactory, publicProcedure, router } from "../trpc/init";
import { projectsRouter } from "./project";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "ok"),
  hello: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      message: "hello",
    };
  }),
  projects: projectsRouter,
});

export const caller = createCallerFactory(appRouter)(createContext);

export type AppRouter = typeof appRouter;
