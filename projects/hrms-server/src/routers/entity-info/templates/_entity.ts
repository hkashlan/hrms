import { EntityWithValidation } from '@hrms-server/model/entity.z';
import { entityUtils, writeFile } from './_utils';

export function entity(schema: EntityWithValidation) {
  const content = entityTemplate(schema);
  const filePath = `projects/hrms/src/app/entities/${schema.name}.entity.ts`;
  return writeFile(filePath, content);
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
