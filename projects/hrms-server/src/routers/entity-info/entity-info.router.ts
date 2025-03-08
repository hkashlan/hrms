import { exec, ExecException } from 'child_process';
import { z } from 'zod';
import { EntityWithValidation, EntityWithValidationZ } from '../../model/entity.z';
import { t } from '../../trpc';
import { entity } from './templates/_entity';
import { pages } from './templates/_pages';
import { router } from './templates/_router';
import { schema } from './templates/_schema';

const validation = EntityWithValidationZ().extend({
  name: z.string(),
});

const tttt = validation.parse({
  name: 'blogFilterSchema',
  label: 'blog description',
  properties: {
    id: {
      type: 'primary',
      label: 'ID',
    },
    content: {
      type: 'text',
      label: 'firstname',
      hooks: {
        list: {
          noFilter: true,
        },
      },
    },
  },
});

console.log('tttt ', JSON.stringify(tttt));

export const entityRouter = t.router({
  save: t.procedure.input(validation).mutation(async ({ input }) => {
    const entityInto: EntityWithValidation = input as unknown as EntityWithValidation;
    // console.log(input);
    // await rewriteUserSchema(input);
    await schema(entityInto);
    await entity(entityInto);
    await router(entityInto);
    await pages(entityInto);

    const callBack: (error: ExecException | null, stdout: string, stderr: string) => void = (
      error,
      stdout,
      stderr,
    ) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    };

    await exec('npm run drizzle', async (error, stdout, stderr) => {
      callBack(error, stdout, stderr);
      await exec('npm run prettier', callBack);
    });
    return input;
  }),
});
