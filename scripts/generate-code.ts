import { DrizzleTableInfo } from './../projects/hrms-server/src/utils/drizzle-table-info';
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { z, ZodType } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directory where your Zod schemas are located
const SCHEMA_DIRECTORY = path.join(__dirname, '../projects/hrms-server/src/db/schamas');

async function loadSchemas(directory: string) {
  const files = fs.readdirSync(directory);
  const schemas: Record<string, ZodType<any>> = {};

  for (const file of files) {
    const filePath = path.join(directory, file);
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      console.log(`Loading schema ${filePath}`);
      const module = await import(filePath);

      for (const [exportName, exportedValue] of Object.entries(module)) {
        const tt = exportedValue as DrizzleTableInfo;
        console.log(`Exporting ${exportName} from ${filePath}`);
        if (tt.insertValidation) {
          schemas[exportName] = tt.insertValidation;
        }
      }
    }
  }
  return schemas;
}

function generateAngularFormFromSchema(schema: ZodType<any>) {
  // Ensure the schema is a ZodObject, as only ZodObjects have .shape
  if (!(schema instanceof z.ZodObject)) {
    throw new Error('Schema is not a ZodObject');
  }

  const shape = schema.shape;
  const formControls: string[] = [];

  for (const [field, definition] of Object.entries(shape)) {
    const validators = [];
    if (definition instanceof z.ZodString) {
      validators.push('Validators.required');
      if (definition.isEmail) validators.push('Validators.email');
    } else if (definition instanceof z.ZodNumber) {
      validators.push('Validators.required');
    }

    formControls.push(`${field}: new FormControl('', [${validators.join(', ')}])`);
  }

  return `new FormGroup({ ${formControls.join(', ')} })`;
}

async function main() {
  const schemas = await loadSchemas(SCHEMA_DIRECTORY);

  for (const [schemaName, schema] of Object.entries(schemas)) {
    console.log(`Angular form for schema ${schemaName}:`);
    console.log(generateAngularFormFromSchema(schema));
  }
}

main().catch(console.error);
