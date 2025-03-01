import { z, ZodType } from 'zod';

export const PropertyInputTypeZ = z.enum(['number', 'text']);
export type PropertyInputType = z.infer<typeof PropertyInputTypeZ>;

export const PropertyTypeZ = z.enum([
  'primary',
  'textarea',
  'autocomplete',
  'date',
  'select',
  'boolean',
]);
export type PropertyType = z.infer<typeof PropertyTypeZ>;

export const BasePropertyZ = z.object({
  type: z.union([PropertyTypeZ, PropertyInputTypeZ]),
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
export type BaseProperty = z.infer<typeof BasePropertyZ>;

export const BaseBasePropertyZ = BasePropertyZ.extend({
  type: z.enum(['primary', 'textarea', 'date']).or(PropertyInputTypeZ),
});
export type BaseBaseProperty = z.infer<typeof BaseBasePropertyZ>;

export const BaseValidatePropertyZ = BasePropertyZ.extend({
  validation: z.instanceof(ZodType),
});

export type BaseValidateProperty = z.infer<typeof BaseValidatePropertyZ>;

export const InputPropertyZ = BasePropertyZ.extend({
  type: PropertyInputTypeZ,
});
export type InputProperty = z.infer<typeof InputPropertyZ>;

export const AutoCompletePropertyZ = BasePropertyZ.extend({
  type: z.literal('autocomplete'),
  options: z.array(z.string()),
});
export type AutoCompleteProperty = z.infer<typeof AutoCompletePropertyZ>;

export const SelectPropertyZ = BasePropertyZ.extend({
  type: z.literal('select'),
  options: z.array(z.string()),
});
export type SelectProperty = z.infer<typeof SelectPropertyZ>;

export const BooleanPropertyZ = BasePropertyZ.extend({
  type: z.literal('boolean'),
});
export type BooleanProperty = z.infer<typeof BooleanPropertyZ>;

export const PropertyZ = z.union([
  AutoCompletePropertyZ,
  SelectPropertyZ,
  BooleanPropertyZ,
  BaseBasePropertyZ,
]);
export type Property = z.infer<typeof PropertyZ>;

export const ValidationSchema = z.object({
  length: z.number().optional(),
  notNull: z.boolean().default(true).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

const AutoCompletePropertyWithValidationZ = AutoCompletePropertyZ.extend(ValidationSchema.shape);
export const SelectPropertyWithValidationZ = SelectPropertyZ.extend(ValidationSchema.shape);
const BooleanPropertyWithValidationZ = BooleanPropertyZ.extend(ValidationSchema.shape);
const BaseBasePropertyWithValidationZ = BaseBasePropertyZ.extend(ValidationSchema.shape);

export const PropertyWithValidationZ = z.union([
  AutoCompletePropertyWithValidationZ,
  SelectPropertyWithValidationZ,
  BooleanPropertyWithValidationZ,
  BaseBasePropertyWithValidationZ,
]);

export type PropertyWithValidation = z.infer<typeof PropertyWithValidationZ>;
