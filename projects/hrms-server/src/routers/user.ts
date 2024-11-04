import { userTableInfo } from '../db/schamas/users';
import { t } from '../trpc';
import { curd } from '../utils/route';

// export const userRouter = t.router({
//   list: t.procedure.input(userFilterSchema).query(async ({ input, ctx }) => {
//     const query = ctx.db.select().from(users).$dynamic();
//     try {
//       const retVal = await query.where(applyFilters(users, input));
//       return retVal;
//     } catch (error) {
//       console.log('error', error);
//       throw error;
//     }
//   }),
//   create: t.procedure.input(insertUserSchema).mutation(async ({ input, ctx }) => {
//     return await ctx.db.insert(users).values(input).returning();
//   }),
//   update: t.procedure.input(updateUserSchema).mutation(async ({ input, ctx }) => {
//     const { id, ...updateData } = input;
//     return await ctx.db.update(users).set(updateData).where(eq(users.id, id)).returning();
//   }),
//   delete: t.procedure.input(z.object({ id: z.number() })).mutation(async ({ input, ctx }) => {
//     const deletedPost = await ctx.db.delete(users).where(eq(users.id, input.id)).returning();
//     return deletedPost;
//   }),
//   getById: t.procedure.input(z.object({ id: z.number() })).query(async ({ input, ctx }) => {
//     const post = await ctx.db.select().from(users).where(eq(users.id, input.id)).limit(1);
//     return post[0];
//   }),
//   // other user-related CRUD operations
// });

export const userRouter = t.router(curd(userTableInfo));
