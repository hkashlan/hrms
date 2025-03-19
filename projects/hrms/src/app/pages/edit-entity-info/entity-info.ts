import { BaseProperty, Property, SelectProperty } from '@hrms-server/model/property.z';
import { Entity, generateEntity, KeyProperty } from 'ui-kit';
import { z } from 'zod';
import { OptionsComponent } from './edit-entity-property/options/options.component';

const type2Color: Record<BaseProperty['type'], string> = {
  primary: 'btn-primary',
  number: 'btn-secondary',
  select: 'btn-info',
  boolean: 'btn-secondary',
  text: 'btn-warning',
  textarea: 'btn-warning',
  date: 'btn-success',
  autocomplete: 'btn-success',
  json: 'btn-danger',
};

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
export type propertyType = KeyProperty<Omit<Property, 'validation'>>;

export const propertyWithValidationInfo: Entity<propertyType> = generateEntity<propertyType>({
  formChanged: (entity, value) => {
    (entity.properties as Record<string, Property>)['options']!.hooks!.details!.hidden =
      value?.type !== 'select';
    (entity.properties as Record<string, Property>)['entity']!.hooks!.details!.hidden =
      value?.type !== 'autocomplete';
  },
  schema: z.object({
    type: typeValidation,
    label: z.string(),
    hooks: hookValidation,
    entity: z.string().optional(),
    options: z.array(z.string()).optional(),
    length: z.number().optional(),
    notNull: z.boolean().default(true).optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    key: z.string(),
    // validation: z.any().optional()
  }), //  add your schema here if you have one
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
        hooks: {
          list: {
            fn: (x) => `<div class="btn btn-xs ${type2Color[x.type]}">${x.type}</div>`,
            hideFilter: true,
          },
        },
      } as SelectProperty<propertyType>,
      label: {
        type: 'text',
        label: 'Label',
        hooks: {
          list: {
            hideFilter: true,
          },
        },
      },
      key: {
        type: 'text',
        label: 'Key',
        hooks: {
          list: {
            hideFilter: true,
          },
        },
      },
      options: {
        type: 'text',
        label: 'Options',
        hooks: {
          details: {
            component: OptionsComponent,
          },
          list: {
            hidden: true,
          },
        },
      },
      entity: {
        type: 'text',
        label: 'Entity',
        hooks: {
          list: {
            hidden: true,
          },
          details: {},
        },
      },
      min: {
        type: 'number',
        label: 'Min',
        hooks: {
          list: {
            hidden: true,
          },
        },
      },
      max: {
        type: 'number',
        label: 'max',
        hooks: {
          list: {
            hidden: true,
          },
        },
      },
      length: {
        type: 'number',
        label: 'length',
        hooks: {
          list: {
            hidden: true,
          },
        },
      },
      notNull: {
        type: 'boolean',
        label: 'no null',
        hooks: {
          list: {
            hidden: true,
          },
        },
      },
      hooks: {
        type: 'boolean',
        label: 'no null',
        hooks: {
          list: {
            hidden: true,
          },
          details: {
            hidden: true,
          },
        },
      },
      validation: {
        type: 'text',
        label: 'Validation',
        hooks: {
          list: {
            hidden: true,
          },
        },
      },
    },
  },
});
