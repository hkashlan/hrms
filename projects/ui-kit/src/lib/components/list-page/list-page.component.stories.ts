import { ActivatedRoute, convertToParamMap } from '@angular/router';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { Entity } from 'ui-kit';
import { z } from 'zod';
import { ListPageComponent } from './list-page.component';

interface Record {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const entity: Entity<Record> = {
  label: 'Record',
  name: 'record',
  schema: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
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
    phone: {
      type: 'text',
      label: 'Phone',
      validation: z.string().optional(),
    },
  },
};

const meta: Meta<ListPageComponent<Record>> = {
  title: 'List Page',
  component: ListPageComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ListPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(
              convertToParamMap({
                /* your route params here */
              }),
            ),
            snapshot: {
              paramMap: convertToParamMap({
                /* your route params here */
              }),
            },
          },
        },
      ],
    }),
  ],
  argTypes: {
    entity: {
      control: 'object',
      description: 'Array of items to display in the list.',
    },
    fn: {
      control: 'object',
      description: 'Show a loading spinner.',
    },
  },
};

export default meta;
type Story = StoryObj<ListPageComponent<Record>>;

const fn = (): Promise<Record[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'John Doe', email: 'Kk0oX@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane Doe', email: '9oKoM@example.com', phone: '987-654-3210' },
      ]);
    }, 1000);
  });
};

export const Default: Story = {
  args: {
    entity: entity,
    fn: fn,
  },
};
