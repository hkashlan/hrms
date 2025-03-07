import { z } from 'zod';
import { PropertyWithValidation, PropertyWithValidationZ, PropertyZ } from './property.z'; // You'll need to create this as well

export const EntityWithoutValidationZ = z.object({
  name: z.string(),
  label: z.string(),
  properties: z.record(PropertyZ),
});

// Type inference
export type EntityWithoutValidation = z.infer<typeof EntityWithoutValidationZ>;

export const EntityWithValidationZ = <T extends Record<string, any> = Record<string, any>>() =>
  EntityWithoutValidationZ.extend({
    properties: z.record(z.string(), PropertyWithValidationZ).transform((val) => {
      // type assertion, to get correct type inference.
      return val as { [K in keyof T]: PropertyWithValidation };
    }),
  });

export type EntityWithValidation<T extends Record<string, any> = Record<string, any>> = z.infer<
  ReturnType<typeof EntityWithValidationZ<T>>
>;
