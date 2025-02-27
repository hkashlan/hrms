import { authRouter } from './authRouter';
import { entityRouter } from './routers/entity-info/entity-info.router';
import { userRouter } from './routers/user.router';
import { router, t } from './trpc';

const entitiesRouter = router({
  user: userRouter,
  // student: studentRouter,
  // Add other entity routers here
});

export const appRouter1 = router({
  entities: entitiesRouter,
  entity: entityRouter,
});

export const appRouter = t.mergeRouters(appRouter1, authRouter);
// export const appRouter = t.mergeRouters(appRouter1);
// export type definition of API
export type AppRouter = typeof appRouter;
