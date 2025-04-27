import { fullUserSchema, User } from '@hrms-server/db/schemas/users.table-info';
import { Entity, generateEntity } from 'ui-kit';

export const userInfo: Entity<User> = generateEntity<User>({
  schema: fullUserSchema,
  entity: {
    name: 'users',
    label: 'user',
    properties: {
      id: {
        type: 'primary',
        label: 'ID',
      },
      name: {
        type: 'text',
        label: 'name',
        notNull: true,
        length: 255,
      },
      age: {
        type: 'number',
        label: 'Age',
        hooks: {
          details: {},
        },
      },
      username: {
        type: 'text',
        label: 'username',
        notNull: true,
        length: 255,
      },
      lastName: {
        type: 'text',
        label: 'last name',
        notNull: true,
        length: 255,
      },
      email: {
        type: 'text',
        label: 'Email',
        notNull: true,
        length: 255,
      },
      passwordHash: {
        type: 'text',
        label: 'Password',
        notNull: true,
        hooks: {
          list: {
            hidden: true,
          },
        },
      },
      gender: {
        type: 'select',
        label: 'Gender',
        options: ['male', 'female'],
      },
      married: {
        type: 'boolean',
        label: 'Married',
      },
      birthDate: {
        type: 'date',
        label: 'Birth Date',
      },
    },
  },
});
