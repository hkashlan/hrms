import { z } from 'zod';
import { authRouter } from './authRouter';
import { userRouter } from './routers/user';
import { procedure, router, t } from './trpc';

export const appRouter1 = router({
  user: userRouter,
  getUser: procedure.input(z.string()).query((opts) => {
    // opts.input; // string
    return { id: opts.input, name: 'Bilbo' };
  }),
  createUser: procedure.input(z.object({ name: z.string().min(5) })).mutation((opts) => {
    // use your ORM of choice
    return { name: 'hadi', age: 44 };
  }),
  // query: procedure.input(z.string()).query((opts) => {}),
});

export const appRouter = t.mergeRouters(appRouter1, authRouter);
// export const appRouter = t.mergeRouters(appRouter1);
// export type definition of API
export type AppRouter = typeof appRouter;
