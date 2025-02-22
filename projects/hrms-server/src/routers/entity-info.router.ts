import { EntityWithoutValidationSchema } from '../model/entity.schema';
import { t } from '../trpc';

export const userRouter = t.router({
  save: t.procedure.input(EntityWithoutValidationSchema).mutation(async ({ input }) => {
    return input;
  }),
});
