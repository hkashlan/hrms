import { InferSelectModel } from 'drizzle-orm';
import { boolean, date, integer, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { DrizzleTableInfo } from '../../utils/drizzle-table-info';
import { filterSchema } from '../createFilterSchema';

export const genderEnum = pgEnum('gender', ['male', 'female']);

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  age: integer(),
  name: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  married: boolean().default(false),
  birthDate: date('birth_date'),
  gender: genderEnum().default('male'),
});

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
});
// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);
export const updateUserSchema = selectUserSchema.partial().extend({ id: z.number() });
export const fullUserSchema = insertUserSchema.extend({ id: z.number() });

export const userFilterSchema = filterSchema.createFilterSchema<User>(users);
export type User = InferSelectModel<typeof users>; // This infers the User type based on the Drizzle schema

export const userTableInfo: DrizzleTableInfo<
  User,
  typeof insertUserSchema,
  typeof userFilterSchema,
  typeof updateUserSchema
> = {
  record: {} as User,
  table: users,
  insertValidation: insertUserSchema,
  selectValidation: userFilterSchema,
  updateValidation: updateUserSchema,
};
