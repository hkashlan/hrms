import { Component, forwardRef, input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { User } from '@hrms-server/db/schamas';
import { IDetailComponent } from '@hrms-server/model/icomponent';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DynamicFormComponent, Entity } from 'ui-kit';
import { z } from 'zod';

interface Record {
  id: number;
  name: string;
  email: string;
  options: string[];
}

@Component({
  imports: [ReactiveFormsModule],
  template: `
    <textarea [formControl]="textControl" rows="7"></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionsComponent),
      multi: true,
    },
  ],
})
export class OptionsComponent implements IDetailComponent<User> {
  record = input.required<User>();
  formControl = input.required<FormControl<string[] | null>>();

  textControl = new FormControl('');
  constructor() {
    this.textControl.valueChanges.subscribe((value) => {
      if (value) {
        this.formControl().setValue(value.split('\n'));
      } else {
        this.formControl().setValue(null);
      }
    });
  }
}

const entity: Entity<Record> = {
  label: 'Record',
  name: 'record',
  schema: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    options: z.array(z.string()),
  }),
  properties: {
    id: {
      type: 'number',
      label: 'ID',
      validation: z.number().optional(),
    },
    name: {
      type: 'text',
      label: 'Name',
      validation: z.string().optional(),
    },
    email: {
      type: 'text',
      label: 'Email',
      validation: z.string().optional(),
    },
    options: {
      type: 'text',
      label: 'Phone',
      hooks: {
        details: {
          component: OptionsComponent,
        },
      },
      validation: z.array(z.string()).optional(),
    },
  },
};

const meta: Meta<DynamicFormComponent<Record>> = {
  title: 'Form Page',
  component: DynamicFormComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DynamicFormComponent, OptionsComponent],
    }),
  ],
  argTypes: {
    entity: {
      control: 'object',
      description: 'Array of items to display in the list.',
    },
  },
};

export default meta;
type Story = StoryObj<DynamicFormComponent<Record>>;

export const Default: Story = {
  args: {
    entity: entity,
  },
};
