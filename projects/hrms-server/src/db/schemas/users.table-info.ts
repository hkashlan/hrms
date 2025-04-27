import { DrizzleTableInfo } from '@hrms-server/utils/drizzle-table-info';
import { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { filterSchema } from '../createFilterSchema';
import { users } from './users.schema';

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
