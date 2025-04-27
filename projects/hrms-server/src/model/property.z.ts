import { Type } from '@angular/core';
import { SchemaKey, schemaKeys } from '@hrms-server/db/schemas/schema-keys';
import { z, ZodType } from 'zod';

// Get the keys of the schemas

export const PropertyInputTypeZ = z.enum(['number', 'text']);
export type PropertyInputType = z.infer<typeof PropertyInputTypeZ>;

export const PropertyTypeZ = z.enum([
  'primary',
  'textarea',
  'autocomplete',
  'date',
  'select',
  'boolean',
  'json',
]);
export type PropertyType = z.infer<typeof PropertyTypeZ>;

export const BasePropertyZ = <T>() =>
  z.object({
    type: z.union([PropertyTypeZ, PropertyInputTypeZ]),
    label: z.string(),
    validation: z.instanceof(ZodType).optional(),
    notNull: z.boolean().default(true).optional(),
    hooks: z
      .object({
        details: z
          .object({
            hidden: z.boolean().optional(),
            component: z.custom<Type<any>>().optional(),
          })
          .optional(),
        list: z
          .object({
            hidden: z.boolean().optional(),
            hideFilter: z.boolean().optional(),
            fn: z.function().args(z.custom<T>()).returns(z.string()).optional(),
            component: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
  });
export type BaseProperty<T = any> = z.infer<ReturnType<typeof BasePropertyZ<T>>>;

export const BaseBasePropertyZ = <T>() =>
  BasePropertyZ<T>().extend({
    type: z.enum(['primary', 'textarea', 'date', 'json']).or(PropertyInputTypeZ),
  });

export type BaseBaseProperty<T = any> = z.infer<ReturnType<typeof BaseBasePropertyZ<T>>>;

export const InputPropertyZ = <T>() =>
  BasePropertyZ<T>().extend({
    type: PropertyInputTypeZ,
    length: z.number().optional(),

    min: z.number().optional(),
    max: z.number().optional(),
  });
export type InputProperty<T = any> = z.infer<ReturnType<typeof InputPropertyZ<T>>>;

export const AutoCompletePropertyZ = <T>() =>
  BasePropertyZ<T>().extend({
    type: z.literal('autocomplete'),
    entity: z.literal<SchemaKey>(schemaKeys[0]),
  });
export type AutoCompleteProperty<T = any> = z.infer<ReturnType<typeof AutoCompletePropertyZ<T>>>;

export const SelectPropertyZ = <T>() =>
  BasePropertyZ<T>().extend({
    type: z.literal('select'),
    options: z.array(z.string()),
  });
export type SelectProperty<T = any> = z.infer<ReturnType<typeof SelectPropertyZ<T>>>;

export const BooleanPropertyZ = <T>() =>
  BasePropertyZ<T>().extend({
    type: z.literal('boolean'),
  });
export type BooleanProperty<T = any> = z.infer<ReturnType<typeof BooleanPropertyZ<T>>>;

export const PropertyZ = <T>() =>
  z.union([
    AutoCompletePropertyZ<T>(),
    SelectPropertyZ<T>(),
    BooleanPropertyZ<T>(),
    BaseBasePropertyZ<T>(),
    InputPropertyZ<T>(),
  ]);

export type Property<T = any> = z.infer<ReturnType<typeof PropertyZ<T>>>;
