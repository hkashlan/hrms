import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { DrizzleTableInfo } from '../../utils/drizzle-table-info';
import { filterSchema } from '../createFilterSchema';

export const folders = pgTable('folders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name'),
});
export const insertFolderSchema = createInsertSchema(folders);

export const selectFolderSchema = createSelectSchema(folders);
export const updateFolderSchema = selectFolderSchema.partial().extend({ id: z.number() });
export const fullFolderSchema = insertFolderSchema.extend({ id: z.number() });

export const folderFilterSchema = filterSchema.createFilterSchema<Folder>(folders);
export type Folder = InferSelectModel<typeof folders>; // This infers the Folder type based on the Drizzle schema

export const folderTableInfo: DrizzleTableInfo<
  Folder,
  typeof insertFolderSchema,
  typeof folderFilterSchema,
  typeof updateFolderSchema
> = {
  record: {} as Folder,
  table: folders,
  insertValidation: insertFolderSchema,
  selectValidation: folderFilterSchema,
  updateValidation: updateFolderSchema,
};
