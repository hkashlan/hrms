import { InferSelectModel } from 'drizzle-orm';
import { users } from './schema';

export type User = InferSelectModel<typeof users>; // This infers the User type based on the Drizzle schema
