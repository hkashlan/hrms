/* eslint-disable @typescript-eslint/no-explicit-any */
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export type zodAny = z.ZodObject<any, any, any>;

export interface DrizzleTableInfo<
  T extends zodAny = zodAny,
  X extends z.ZodTypeAny = z.ZodTypeAny,
  Y extends zodAny = zodAny,
> {
  table: PgTableWithColumns<any>;
  insertValidation: T;
  selectValidation: X;
  updateValidation: Y;
}
