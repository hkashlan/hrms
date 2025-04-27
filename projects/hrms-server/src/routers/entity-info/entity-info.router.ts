import { exec, ExecException } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';
import { EntityInfo } from '../../model/entity.z';
import { t } from '../../trpc';
import { entity } from './templates/_entity';
import { pages } from './templates/_pages';
import { router } from './templates/_router';
import { drizzleFilePath, schema } from './templates/_schema';

// const tttt = validation.parse({
//   name: 'blogFilterSchema',
//   label: 'blog description',
//   properties: {
//     id: {
//       type: 'primary',
//       label: 'ID',
//     },
//     content: {
//       type: 'text',
//       label: 'firstname',
//       hooks: {
//         list: {
//           noFilter: true,
//         },
//       },
//     },
//   },
// });

// console.log('tttt ', JSON.stringify(tttt));
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

export const entityRouter = t.router({
  save: t.procedure
    .input(z.object({}).passthrough()) // Accepts any object
    .mutation(async ({ input }) => {
      const entityInto: EntityInfo = input as unknown as EntityInfo;
      const filePath = path.resolve(drizzleFilePath(entityInto)); // Ensure absolute path
      const fileExists = fs.existsSync(filePath);
      // console.log(input);
      // await rewriteUserSchema(input);
      await schema(entityInto, fileExists);
      await entity(entityInto, fileExists);
      if (!fileExists) {
        await router(entityInto);
        await pages(entityInto);
      }

      await exec('npm run drizzle', async (error, stdout, stderr) => {
        callBack(error, stdout, stderr);
        await exec('npm run prettier', callBack);
      });

      return input;
    }),
});
