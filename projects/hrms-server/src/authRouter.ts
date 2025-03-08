// app/api/routers/auth.ts
import { TRPCError } from '@trpc/server';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { sign } from 'jsonwebtoken';
import { z } from 'zod';
import { users } from './db/schemas/users.schema';
import { procedure, router } from './trpc';

const generateToken = (userId: number) => {
  return sign({ userId }, process.env['JWT_SECRET']!, {
    expiresIn: '1h',
  });
};

export const authRouter = router({
  signup: procedure
    .input(
      z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;

      // Check if email is already in use
      const query = ctx.db.select().from(users).where(eq(users.email, email));
      console.log('query', query.toSQL());
      try {
        const existingUser = await query;
        if (existingUser.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email already in use',
          });
        }

        // Hash password and create user
        const passwordHash = await bcrypt.hash(password, 10);
        const [user] = await ctx.db
          .insert(users)
          .values({
            username,
            email,
            passwordHash,
          })
          .returning();

        // Return token
        const token = generateToken(user.id);
        return { token, user };
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    }),
  login: procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const users1 = await ctx.db.select().from(users).where(eq(users.email, input.email));
      // const users = await ctx.db.select().from(usersTable);

      const userRecord = users1?.[0];

      if (!userRecord || !(await bcrypt.compare(input.password, userRecord.passwordHash))) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid email or password',
        });
      }

      const token = generateToken(userRecord.id);

      return { token };
    }),
});
