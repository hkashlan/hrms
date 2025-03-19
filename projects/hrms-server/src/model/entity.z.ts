import { z } from 'zod';
import * as schemas from '../db/schemas';
import { Property, PropertyZ } from './property.z'; // You'll need to create this as well

// Get the keys of the schemas
type SchemaKey = keyof typeof schemas;
const schemaKeys = Object.keys(schemas) as SchemaKey[];

export const EntityInfoZ = <T>() =>
  z.object({
    name: z.literal<SchemaKey>(schemaKeys[0]),
    label: z.string(),
    properties: z.record(z.string(), PropertyZ<T>()).transform((val) => {
      // type assertion, to get correct type inference.
      return val as { [K in keyof T]: Property<T> };
    }),
  });

export type EntityInfo<T = {}> = z.infer<ReturnType<typeof EntityInfoZ<T>>>;
