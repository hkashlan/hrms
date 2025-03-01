import { authRouter } from './authRouter';
import { entitiesRouter } from './routers/entities';
import { entityRouter } from './routers/entity-info/entity-info.router';
import { router, t } from './trpc';

export const appRouter1 = router({
  entities: entitiesRouter,
  entity: entityRouter,
});

export const appRouter = t.mergeRouters(appRouter1, authRouter);
// export const appRouter = t.mergeRouters(appRouter1);
// export type definition of API
export type AppRouter = typeof appRouter;
