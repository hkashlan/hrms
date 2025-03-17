import { PropertyWithValidation } from '@hrms-server/model/property.z';
import { Entity, generateEntity } from 'ui-kit';
import { z } from 'zod';
import { OptionsComponent } from './edit-entity-property/options/options.component';

const hookValidation = z
  .object({
    details: z
      .object({
        hidden: z.boolean().optional(),
        component: z.custom<any>().optional(),
      })
      .optional(),
    list: z
      .object({
        hidden: z.boolean().optional(),
        noFilter: z.boolean().optional(),
        component: z.string().optional(),
      })
      .optional(),
  })
  .optional();

const typeValidation = z.union([
  z.literal('primary'),
  z.literal('textarea'),
  z.literal('autocomplete'),
  z.literal('date'),
  z.literal('select'),
  z.literal('boolean'),
  z.literal('json'),
  z.literal('number'),
  z.literal('text'),
]);

export const propertyWithValidationInfo: Entity<PropertyWithValidation> =
  generateEntity<PropertyWithValidation>({
    schema: z
      .object({
        type: typeValidation,
        label: z.string(),
        hooks: hookValidation,
        entity: z.string().optional(),
        options: z.array(z.string()).optional(),
        length: z.number().optional(),
        notNull: z.boolean().default(true).optional(),
        min: z.number().optional(),
        max: z.number().optional(),
      })
      .refine(
        (data) => {
          if (data.type === 'select' && !data.options) {
            return false;
          }
          if (data.type === 'autocomplete' && !data.entity) {
            return false;
          }
          return true;
        },
        {
          message: 'Options are required when the type is select',
          path: ['options'],
        },
      ), //  add your schema here if you have one
    entity: {
      name: 'propertyWithValidations' as any,
      label: 'Property With Validation',
      properties: {
        type: {
          type: 'select',
          label: 'Type',
          options: [
            'primary',
            'textarea',
            'autocomplete',
            'date',
            'select',
            'boolean',
            'json',
            'number',
            'text',
          ],
        },
        label: {
          type: 'text',
          label: 'Label',
        },
        options: {
          type: 'text',
          label: 'Options',
          hooks: {
            details: {
              component: OptionsComponent,
            },
          },
        },
      },
    },
  });
