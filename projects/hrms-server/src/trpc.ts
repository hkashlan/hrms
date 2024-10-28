import { initTRPC } from '@trpc/server';
import { drizzle } from 'drizzle-orm/connect';

export const createContext = async () => {
  console.log('DATABASE_URL', process.env['DATABASE_URL']);
  const db = await drizzle('node-postgres', {
    connection: process.env['DATABASE_URL']!,
    logger: true,
  });
  // const db = await drizzle('node-postgres',  { logger: true });
  return {
    db,
  };
};
type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();
export const procedure = t.procedure;
export const router = t.router;
