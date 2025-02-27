import { EntityWithValidation } from '@hrms-server/model/entity.z';
import { addToFileBeforeEndingWith, entityUtils, writeFile } from './_utils';

export function router(schema: EntityWithValidation) {
  const content = routerTemplate(schema);
  const filePath = `projects/hrms-server/src/routers/entities/${schema.name}.router.ts`;
  writeFile(filePath, content);
  updateTrpcRouter(schema.name);
}

function routerTemplate(schema: EntityWithValidation) {
  const { plural, capitalized } = entityUtils(schema);
  return `
import { ${schema.name}TableInfo } from '../../db/schamas/${plural}.schema';
import { t } from '../../trpc';
import { curd } from '../../utils/route';

export const ${schema.name}Router = t.router(curd(${schema.name}TableInfo));
  `;
}

function updateTrpcRouter(routerName: string) {
  const trpcRouterPath = 'projects/hrms-server/src/routers/entities/index.ts';
  const importStatement = `import { ${routerName}Router } from './${routerName}.router';\n`;
  const routerEntry = `  ${routerName}: ${routerName}Router,\n`;

  addToFileBeforeEndingWith(trpcRouterPath, importStatement, routerEntry, '});');
}
