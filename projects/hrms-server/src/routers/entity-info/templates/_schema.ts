import { EntityWithValidation } from '@hrms-server/model/entity.z';
import { entityUtils, writeFile } from './_utils';

const type2DBType = {
  text: 'varchar',
  textarea: 'varchar',
  number: 'integer',
  autocomplete: 'integer',
  primary: 'integer',
  boolean: 'boolean',
  date: 'date',
  select: 'pgEnum',
};

export function schema(schema: EntityWithValidation) {
  const content = schemaTemplate(schema);
  const filePath = `projects/hrms-server/src/db/schamas/${schema.name}s.schema.ts`;
  return writeFile(filePath, content);
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Given an EntityWithValidation, generate a Drizzle schema for that entity.
 *
 * The generated schema will include all properties from the entity, except for 'id'.
 * The generated schema will also include insert, select, and update validation schemas.
 * The generated schema will also include a filter schema.
 *
 * @param schema The entity with validation
 * @returns A Drizzle schema string
 */
/******  53de0ea6-baa0-4baf-8a29-412d43561607  *******/
function schemaTemplate(schema: EntityWithValidation) {
  let fields = '';

  for (const property of Object.keys(schema.properties).filter((property) => property !== 'id')) {
    const propertyInfo = schema.properties[property];
    const length = propertyInfo.length ? `, { length: ${propertyInfo.length} }` : '';
    const selectOptions =
      propertyInfo.type === 'select'
        ? `, [${propertyInfo.options.map((p) => `'${p}'`).join(',')}]`
        : '';
    const notNull = propertyInfo.notNull && propertyInfo.type !== 'select' ? '.notNull()' : '';
    const suffix = propertyInfo.type === 'select' ? '()' : '';
    fields += `
  ${property}: ${type2DBType[propertyInfo.type]}('${property}'${length}${selectOptions})${suffix}${notNull},`;
  }

  const { plural, capitalized } = entityUtils(schema);

  return `
import { InferSelectModel } from 'drizzle-orm';
import { boolean, date, integer, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { DrizzleTableInfo } from '../../utils/drizzle-table-info';
import { filterSchema } from '../createFilterSchema';

export const ${plural} = pgTable('${plural}', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  ${fields}
});
export const insert${capitalized}Schema = createInsertSchema(${plural});

export const select${capitalized}Schema = createSelectSchema(${plural});
export const update${capitalized}Schema = select${capitalized}Schema.partial().extend({ id: z.number() });
export const full${capitalized}Schema = insert${capitalized}Schema.extend({ id: z.number() });

export const ${schema.name}FilterSchema = filterSchema.createFilterSchema<${capitalized}>(${plural});
export type ${capitalized} = InferSelectModel<typeof ${plural}>; // This infers the ${capitalized} type based on the Drizzle schema

export const ${schema.name}TableInfo: DrizzleTableInfo<
  ${capitalized},
  typeof insert${capitalized}Schema,
  typeof ${schema.name}FilterSchema,
  typeof update${capitalized}Schema
> = {
  record: {} as ${capitalized},
  table: ${plural},
  insertValidation: insert${capitalized}Schema,
  selectValidation: ${schema.name}FilterSchema,
  updateValidation: update${capitalized}Schema,
};


  `;
}
