import { EntityWithValidation } from '@hrms-server/model/entity.z';
import { addToFileBeforeEndingWith, entityUtils, writeFile } from './_utils';

export async function router(schema: EntityWithValidation) {
  const { singular, capitalized } = entityUtils(schema);
  const content = routerTemplate(schema);
  const filePath = `projects/hrms-server/src/routers/entities/${singular}.router.ts`;
  await writeFile(filePath, content);
  await updateTrpcRouter(singular);
}

function routerTemplate(schema: EntityWithValidation) {
  const { singular, capitalized } = entityUtils(schema);
  return `
import { ${singular}TableInfo } from '../../db/schemas/${schema.name}.schema';
import { t } from '../../trpc';
import { curd } from '../../utils/route';

export const ${singular}Router = t.router(curd(${singular}TableInfo));
  `;
}

async function updateTrpcRouter(routerName: string) {
  const trpcRouterPath = 'projects/hrms-server/src/routers/entities/index.ts';
  const importStatement = `import { ${routerName}Router } from './${routerName}.router';\n`;
  const routerEntry = `  ${routerName}s: ${routerName}Router,\n`;

  await addToFileBeforeEndingWith(trpcRouterPath, importStatement, routerEntry, '});');
}
