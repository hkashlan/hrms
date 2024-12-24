import * as trpcExpress from '@trpc/server/adapters/express';
import { Express } from 'express';
import { createContext } from './trpc';
import { appRouter } from './trpc-router';

export function addTRPC(app: Express) {
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
}
