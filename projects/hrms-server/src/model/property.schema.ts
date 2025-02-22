import { z, ZodType } from 'zod';

export const PropertyInputTypeSchema = z.enum(['number', 'text']);
export type PropertyInputType = z.infer<typeof PropertyInputTypeSchema>;

export const PropertyTypeSchema = z.enum([
  'primary',
  'textarea',
  'autocomplete',
  'date',
  'select',
  'boolean',
]);
export type PropertyType = z.infer<typeof PropertyTypeSchema>;

export const BasePropertySchema = z.object({
  type: z.union([PropertyTypeSchema, PropertyInputTypeSchema]),
  label: z.string(),
  hooks: z
    .object({
      details: z
        .object({
          hidden: z.boolean().optional(),
        })
        .optional(),
      list: z
        .object({
          hidden: z.boolean().optional(),
          noFilter: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
});
export type BaseProperty = z.infer<typeof BasePropertySchema>;

export const BaseBasePropertySchema = BasePropertySchema.extend({
  type: z.enum(['primary', 'textarea', 'date']).or(PropertyInputTypeSchema),
});
export type BaseBaseProperty = z.infer<typeof BaseBasePropertySchema>;

export const BaseValidatePropertySchema = z.object({
  property: BasePropertySchema,
  validation: z.instanceof(ZodType),
});
export type BaseValidateProperty = z.infer<typeof BaseValidatePropertySchema>;

export const InputPropertySchema = BasePropertySchema.extend({
  type: PropertyInputTypeSchema,
});
export type InputProperty = z.infer<typeof InputPropertySchema>;

export const AutoCompletePropertySchema = BasePropertySchema.extend({
  type: z.literal('autocomplete'),
  options: z.array(z.string()),
});
export type AutoCompleteProperty = z.infer<typeof AutoCompletePropertySchema>;

export const SelectPropertySchema = BasePropertySchema.extend({
  type: z.literal('select'),
  options: z.array(z.string()),
});
export type SelectProperty = z.infer<typeof SelectPropertySchema>;

export const BooleanPropertySchema = BasePropertySchema.extend({
  type: z.literal('boolean'),
});
export type BooleanProperty = z.infer<typeof BooleanPropertySchema>;

export const PropertySchema = z.union([
  AutoCompletePropertySchema,
  SelectPropertySchema,
  BooleanPropertySchema,
  BaseBasePropertySchema,
]);
export type Property = z.infer<typeof PropertySchema>;
