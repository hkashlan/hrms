import { EntityWithValidation } from '@hrms-server/model/entity.z';
import { addToFileBeforeEndingWith, entityUtils, writeFile } from './_utils';

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

export async function schema(schema: EntityWithValidation) {
  const { singular, capitalized } = entityUtils(schema);
  const content = schemaTemplate(schema);
  const filePath = `projects/hrms-server/src/db/schemas/${singular}s.schema.ts`;
  await writeFile(filePath, content);
  await updateIndexTs(schema);
}

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
  ${property}: ${type2DBType[propertyInfo.type as keyof typeof type2DBType]}('${property}'${length}${selectOptions})${suffix}${notNull},`;
  }

  const { singular, capitalized } = entityUtils(schema);

  return `
import { InferSelectModel } from 'drizzle-orm';
import { boolean, date, integer, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { DrizzleTableInfo } from '../../utils/drizzle-table-info';
import { filterSchema } from '../createFilterSchema';

export const ${schema.name} = pgTable('${schema.name}', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  ${fields}
});
export const insert${capitalized}Schema = createInsertSchema(${schema.name});

export const select${capitalized}Schema = createSelectSchema(${schema.name});
export const update${capitalized}Schema = select${capitalized}Schema.partial().extend({ id: z.number() });
export const full${capitalized}Schema = insert${capitalized}Schema.extend({ id: z.number() });

export const ${singular}FilterSchema = filterSchema.createFilterSchema<${capitalized}>(${schema.name});
export type ${capitalized} = InferSelectModel<typeof ${schema.name}>; // This infers the ${capitalized} type based on the Drizzle schema

export const ${singular}TableInfo: DrizzleTableInfo<
  ${capitalized},
  typeof insert${capitalized}Schema,
  typeof ${singular}FilterSchema,
  typeof update${capitalized}Schema
> = {
  record: {} as ${capitalized},
  table: ${schema.name},
  insertValidation: insert${capitalized}Schema,
  selectValidation: ${singular}FilterSchema,
  updateValidation: update${capitalized}Schema,
};


  `;
}

async function updateIndexTs(schema: EntityWithValidation) {
  const trpcRouterPath = 'projects/hrms-server/src/db/schemas/index.ts';
  const importStatement = `export * from './${schema.name}.schema';\n`;
  const routerEntry = ``;
  await addToFileBeforeEndingWith(trpcRouterPath, importStatement, routerEntry, '');
}
