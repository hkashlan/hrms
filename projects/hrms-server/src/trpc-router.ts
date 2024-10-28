// import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { authRouter } from './authRouter';
import { applyFilters } from './db/dynamic-query';
import { users } from './db/schema';
import { User } from './db/types';
import { createFilterSchema } from './db/zod';
import { procedure, router, t } from './trpc';

const userFilterSchema = createFilterSchema<User>(users);
userFilterSchema.parse({
  and: [
    {
      age: { lte: 40 },
      username: { contains: 'John' },
    },
  ],
});
// export const t = initTRPC.create();

export const appRouter1 = router({
  getUser: procedure.input(z.string()).query((opts) => {
    // opts.input; // string
    return { id: opts.input, name: 'Bilbo' };
  }),
  createUser: procedure.input(z.object({ name: z.string().min(5) })).mutation((opts) => {
    // use your ORM of choice
    return { name: 'hadi', age: 44 };
  }),
  queryDB: procedure.input(userFilterSchema).query(async ({ input, ctx }) => {
    const query = ctx.db.select().from(users).$dynamic();
    try {
      const retVal = await query.where(applyFilters(users, input));
      return retVal;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }),
  // query: procedure.input(z.string()).query((opts) => {}),
});

export const appRouter = t.mergeRouters(appRouter1, authRouter);
// export const appRouter = t.mergeRouters(appRouter1);
// export type definition of API
export type AppRouter = typeof appRouter;
