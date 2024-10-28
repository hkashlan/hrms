/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getTableColumns } from 'drizzle-orm';
import { PgColumn, PgTableWithColumns } from 'drizzle-orm/pg-core';
import { z, ZodType, ZodTypeAny } from 'zod';
import { Filter } from './client-filters';

// Define filter schemas for different types
const numberFilterSchema = z.object({
  lt: z.number().optional(),
  gt: z.number().optional(),
  lte: z.number().optional(),
  gte: z.number().optional(),
});

const stringFilterSchema = z.object({
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
});

const booleanFilterSchema = z.object({
  equals: z.boolean().optional(),
});

const equalsFilterSchema = <T>(schema: ZodTypeAny) =>
  z.object({
    equals: schema.optional(),
  });

export type FilterOperators<T> = T extends number
  ? typeof numberFilterSchema
  : T extends string
    ? typeof stringFilterSchema
    : T extends boolean
      ? typeof booleanFilterSchema
      : ReturnType<typeof equalsFilterSchema<T>>;

export function createFilterSchema<T extends Record<string, any>>(
  drizzleTable: PgTableWithColumns<any>,
): ZodType<Filter<T>> {
  const fields: Record<string, ZodTypeAny> = {};

  // Iterate directly over the table definition to access columns
  for (const key in getTableColumns(drizzleTable)) {
    const column = drizzleTable[key];
    fields[key] = mapDrizzleColumnToFilterZod(column).optional(); // Make each field optional
  }

  // Define the filter schema with recursive `and` and `or` logic
  const filterSchema: ZodType<Filter<T>> = z.object(fields).extend({
    and: z.array(z.lazy(() => filterSchema)).optional(),
    or: z.array(z.lazy(() => filterSchema)).optional(),
  }) as any;

  return filterSchema;
}

function mapDrizzleColumnToFilterZod(column: PgColumn<any>): ZodTypeAny {
  if (column.dataType === 'number') {
    return z.object({
      lt: z.number().optional(),
      gt: z.number().optional(),
      lte: z.number().optional(),
      gte: z.number().optional(),
      equals: z.number().optional(),
    });
  } else if (column.dataType === 'string') {
    return z.object({
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      equals: z.string().optional(),
    });
  } else if (column.dataType === 'boolean') {
    return z.object({
      equals: z.boolean().optional(),
    });
  }
  throw new Error(`Unsupported column type: ${column.dataType}`);
}
