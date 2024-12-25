/* eslint-disable @typescript-eslint/no-explicit-any */
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export type zodAny = z.ZodObject<any, any, any>;

export interface DrizzleTableInfo<
  T,
  X extends zodAny = zodAny,
  Y extends z.ZodTypeAny = z.ZodTypeAny,
  Z extends zodAny = zodAny,
> {
  record: T;
  table: PgTableWithColumns<any>;
  insertValidation: X;
  selectValidation: Y;
  updateValidation: Z;
}
