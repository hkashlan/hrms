import { InferSelectModel } from 'drizzle-orm';
import { foreignKey, integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { DrizzleTableInfo } from '../../utils/drizzle-table-info';
import { filterSchema } from '../createFilterSchema';
import { folders } from './folders.schema';

export const medias = pgTable(
  'medias',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    folderId: integer('folder_id'),
    name: varchar('name'),
    url: varchar('url'),
    mimeType: varchar('mimeType'),
    size: integer('size'),
  },
  (table) => [
    foreignKey({
      name: 'media_folder_fk',
      columns: [table.folderId],
      foreignColumns: [folders.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  ],
);
export const insertMediaSchema = createInsertSchema(medias);

export const selectMediaSchema = createSelectSchema(medias);
export const updateMediaSchema = selectMediaSchema.partial().extend({ id: z.number() });
export const fullMediaSchema = insertMediaSchema.extend({ id: z.number() });

export const mediaFilterSchema = filterSchema.createFilterSchema<Media>(medias);
export type Media = InferSelectModel<typeof medias>; // This infers the Media type based on the Drizzle schema

export const mediaTableInfo: DrizzleTableInfo<
  Media,
  typeof insertMediaSchema,
  typeof mediaFilterSchema,
  typeof updateMediaSchema
> = {
  record: {} as Media,
  table: medias,
  insertValidation: insertMediaSchema,
  selectValidation: mediaFilterSchema,
  updateValidation: updateMediaSchema,
};
