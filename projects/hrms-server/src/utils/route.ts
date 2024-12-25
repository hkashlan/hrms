import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { applyFilters } from '../db/dynamic-query';
import { t } from '../trpc';
import { DrizzleTableInfo, zodAny } from './drizzle-table-info';

export function curd<T, X extends zodAny, Y extends z.ZodTypeAny, Z extends zodAny>(
  tableInfo: DrizzleTableInfo<T, X, Y, Z>,
) {
  return {
    list: t.procedure.input(tableInfo.selectValidation).query(async ({ input, ctx }) => {
      const query = ctx.db.select().from(tableInfo.table).$dynamic();
      try {
        const retVal = await query.where(applyFilters(tableInfo.table, input));
        return retVal as T[];
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    }),
    create: t.procedure.input(tableInfo.insertValidation).mutation(async ({ input, ctx }) => {
      return (await ctx.db.insert(tableInfo.table).values(input).returning()) as T;
    }),
    update: t.procedure.input(tableInfo.updateValidation).mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;
      return (await ctx.db
        .update(tableInfo.table)
        .set(updateData)
        .where(eq(tableInfo.table['id'], id))
        .returning()) as T;
    }),
    delete: t.procedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
      const deletedPost = await ctx.db
        .delete(tableInfo.table)
        .where(eq(tableInfo.table['id'], input.id))
        .returning();
      return deletedPost as T;
    }),
    getById: t.procedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
      const post = await ctx.db
        .select()
        .from(tableInfo.table)
        .where(eq(tableInfo.table['id'], input.id))
        .limit(1);
      return post[0] as T;
    }),
  };
}
