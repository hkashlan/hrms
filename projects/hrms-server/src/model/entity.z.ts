import { z } from 'zod';
import { PropertyWithValidationZ, PropertyZ } from './property.z'; // You'll need to create this as well

export const EntityWithoutValidationZ = z.object({
  name: z.string(),
  label: z.string(),
  properties: z.record(PropertyZ),
});

// Type inference
export type EntityWithoutValidation = z.infer<typeof EntityWithoutValidationZ>;

export const EntityWithValidationZ = EntityWithoutValidationZ.extend({
  properties: z.record(PropertyWithValidationZ),
});

export type EntityWithValidation = z.infer<typeof EntityWithValidationZ>;
