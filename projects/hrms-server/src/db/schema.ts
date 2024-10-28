import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { Filter } from './client-filters';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  age: integer(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
});

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users);
// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);

export type tt = z.infer<typeof insertUserSchema>;
type UserFilter = Filter<tt>;

const userFilter: UserFilter = {
  or: [{ username: { contains: 'John' } }, { age: { gt: 30 } }],
  and: [
    // { isActive: { equals: true } },
    { age: { lte: 40 } },
  ],
  id: { gt: 10 },
};
