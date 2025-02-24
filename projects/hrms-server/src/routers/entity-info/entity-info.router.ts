import { EntityWithValidationZ } from '../../model/entity.z';
import { t } from '../../trpc';
import { entity } from './templates/_entity';
import { schema } from './templates/_schema';

export const entityRouter = t.router({
  save: t.procedure.input(EntityWithValidationZ).mutation(async ({ input }) => {
    // console.log(input);
    // await rewriteUserSchema(input);
    await schema(input);
    console.log(await entity(input));
    return input;
  }),
});
