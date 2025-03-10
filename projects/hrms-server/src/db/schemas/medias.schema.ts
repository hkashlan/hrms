import { InferSelectModel } from 'drizzle-orm';
import { boolean, date, integer, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { DrizzleTableInfo } from '../../utils/drizzle-table-info';
import { filterSchema } from '../createFilterSchema';

export const medias = pgTable('medias', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: varchar('name'),
  url: varchar('url'),
  mimeType: varchar('mimeType'),
  size: integer('size'),
});
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
