import { exec } from 'child_process';
import { EntityWithValidationZ } from '../../model/entity.z';
import { t } from '../../trpc';
import { entity } from './templates/_entity';
import { router } from './templates/_router';
import { schema } from './templates/_schema';

export const entityRouter = t.router({
  save: t.procedure.input(EntityWithValidationZ).mutation(async ({ input }) => {
    // console.log(input);
    // await rewriteUserSchema(input);
    await schema(input);
    await entity(input);
    await router(input);

    await exec('npm run drizzle', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
    return input;
  }),
});
