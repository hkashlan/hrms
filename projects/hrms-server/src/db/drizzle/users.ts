import { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { DrizzleTableInfo } from '../../utils/drizzle-table-info';
import { createFilterSchema } from '../createFilterSchema';
import { users } from '../schemas/users.schema';

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users);
// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);
export const updateUserSchema = selectUserSchema.partial().extend({ id: z.number() });

export const userFilterSchema = createFilterSchema<User>(users);
export type User = InferSelectModel<typeof users>; // This infers the User type based on the Drizzle schema

export const userTableInfo: DrizzleTableInfo<
  typeof insertUserSchema,
  typeof userFilterSchema,
  typeof updateUserSchema
> = {
  table: users,
  insertValidation: insertUserSchema,
  selectValidation: userFilterSchema,
  updateValidation: updateUserSchema,
};
