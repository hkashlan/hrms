import { EntityWithValidation } from '@hrms-server/model/entity.z';
import fs from 'fs';
import path from 'path';

export function entityUtils(schema: EntityWithValidation) {
  const plural = schema.name + 's';
  const capitalized = schema.name.charAt(0).toUpperCase() + schema.name.slice(1);
  return { plural, capitalized };
}

export async function writeFile(filePath: string, content: string) {
  const schemaPath = path.resolve(filePath);
  console.log(schemaPath);
  await fs.promises.writeFile(schemaPath, content);
}
