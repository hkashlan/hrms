import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import * as schemas from './index';

export type SchemaKey = {
  [K in keyof typeof schemas]: (typeof schemas)[K] extends PgTableWithColumns<any> ? K : never;
}[keyof typeof schemas];
export const schemaKeys = Object.keys(schemas) as SchemaKey[];
