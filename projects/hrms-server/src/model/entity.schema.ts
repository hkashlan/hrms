import { z } from 'zod';
import { PropertySchema } from './property.schema'; // You'll need to create this as well

export const EntityWithoutValidationSchema = z.object({
  name: z.string(),
  label: z.string(),
  properties: z.record(PropertySchema),
});

// Type inference
export type EntityWithoutValidation = z.infer<typeof EntityWithoutValidationSchema>;
