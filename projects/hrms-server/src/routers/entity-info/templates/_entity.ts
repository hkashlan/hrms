import { EntityWithValidation } from '@hrms-server/model/entity.z';
import { addToFileBeforeEndingWith, entityUtils, writeFile } from './_utils';

export async function entity(schema: EntityWithValidation) {
  const content = entityTemplate(schema);
  const filePath = `projects/hrms/src/app/entities/${schema.name}.entity.ts`;
  await writeFile(filePath, content);
  await updateEntityInfos(schema.name);
}

export function entityTemplate(schema: EntityWithValidation) {
  const { plural, capitalized } = entityUtils(schema);

  return `
import { full${capitalized}Schema, ${capitalized} } from '@hrms-server/db/schamas/${plural}.schema';
import { Entity, generateEntity } from 'ui-kit';

export const ${schema.name}Info: Entity<${capitalized}> = generateEntity<${capitalized}>({
  schema: full${capitalized}Schema,
  entity: ${JSON.stringify(schema, null, 2)}
});
  `;
}

async function updateEntityInfos(entity: string) {
  const trpcRouterPath = 'projects/hrms/src/app/entities/indext.ts';
  const importStatement = `import { ${entity}Info } from './${entity}.entity';\n`;
  const routerEntry = ` ${entity}s: ${entity}Info,\n`;

  await addToFileBeforeEndingWith(trpcRouterPath, importStatement, routerEntry, '};');
}
