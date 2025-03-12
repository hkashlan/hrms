import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { DrizzleTableInfo } from '../../utils/drizzle-table-info';
import { filterSchema } from '../createFilterSchema';
import { users } from './users.schema';

export const blogs = pgTable('blogs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  authorId: integer('author_id').references(() => users.id),
  authorName: varchar('author_name'),
  content: varchar('content'),
});
export const insertBlogSchema = createInsertSchema(blogs);

export const selectBlogSchema = createSelectSchema(blogs);
export const updateBlogSchema = selectBlogSchema.partial().extend({ id: z.number() });
export const fullBlogSchema = insertBlogSchema.extend({ id: z.number() });

export const blogFilterSchema = filterSchema.createFilterSchema<Blog>(blogs);
export type Blog = InferSelectModel<typeof blogs>; // This infers the Blog type based on the Drizzle schema

export const blogTableInfo: DrizzleTableInfo<
  Blog,
  typeof insertBlogSchema,
  typeof blogFilterSchema,
  typeof updateBlogSchema
> = {
  record: {} as Blog,
  table: blogs,
  insertValidation: insertBlogSchema,
  selectValidation: blogFilterSchema,
  updateValidation: updateBlogSchema,
};
