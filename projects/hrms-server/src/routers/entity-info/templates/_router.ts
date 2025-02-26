import { EntityWithValidation } from '@hrms-server/model/entity.z';
import fs from 'fs';
import { entityUtils, writeFile } from './_utils';

export function router(schema: EntityWithValidation) {
  const content = routerTemplate(schema);
  const filePath = `projects/hrms-server/src/routers/${schema.name}.router.ts`;
  writeFile(filePath, content);
  updateTrpcRouter(schema.name);
}

function routerTemplate(schema: EntityWithValidation) {
  const { plural, capitalized } = entityUtils(schema);
  return `
import { ${schema.name}TableInfo } from '../db/schamas/${plural}.schema';
import { t } from '../trpc';
import { curd } from '../utils/route';

export const ${schema.name}Router = t.router(curd(${schema.name}TableInfo));
  `;
}

function updateTrpcRouter(routerName: string) {
  const trpcRouterPath = 'projects/hrms-server/src/trpc-router.ts';
  const importStatement = `import { ${routerName}Router } from './routers/${routerName}.router';\n`;
  const routerEntry = `  ${routerName}: ${routerName}Router,\n`;

  let trpcRouterContent = fs.readFileSync(trpcRouterPath, 'utf8');

  // Add import statement
  if (!trpcRouterContent.includes(importStatement)) {
    trpcRouterContent = importStatement + trpcRouterContent;
  }

  // Add router entry
  const routerObjectMatch = trpcRouterContent.match(
    /export const appRouter1 = router\(\{([\s\S]*?)\}\);/,
  );
  if (routerObjectMatch && !routerObjectMatch[1].includes(`${routerName}: ${routerName}Router`)) {
    const updatedRouterObject = routerObjectMatch[1].replace(
      /(\s*entity: entityRouter,?)/,
      `${routerEntry}$1`,
    );
    trpcRouterContent = trpcRouterContent.replace(
      routerObjectMatch[0],
      `export const appRouter1 = router({${updatedRouterObject}});`,
    );
  }

  fs.writeFileSync(trpcRouterPath, trpcRouterContent, 'utf8');
}
