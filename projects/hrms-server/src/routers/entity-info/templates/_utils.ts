import { EntityWithValidation } from '@hrms-server/model/entity.z';
import fs from 'fs';
import path from 'path';

export function entityUtils(schema: EntityWithValidation) {
  const singular = schema.name.slice(0, -1);
  const capitalized = singular.charAt(0).toUpperCase() + singular.slice(1);
  return { singular, capitalized };
}

export async function writeFile(filePath: string, content: string) {
  const schemaPath = path.resolve(filePath);

  const dir = path.dirname(schemaPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log(schemaPath);
  await fs.promises.writeFile(schemaPath, content);
}

export async function addToFileBeforeEndingWith(
  filePath: string,
  importStatement: string,
  entry: string,
  endWith: string,
) {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Add import statement
  if (!fileContent.includes(importStatement)) {
    fileContent = importStatement + fileContent;
  }

  // Add router entry
  const contentUntilEndWith = fileContent.lastIndexOf(endWith);
  const content = fileContent.slice(0, contentUntilEndWith) + entry + endWith;
  fs.writeFileSync(filePath, content, 'utf8');
}
