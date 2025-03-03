import { fullUserSchema, User } from '@hrms-server/db/schamas/users.schema';
import { Entity, generateEntity } from 'ui-kit';

export const userInfo: Entity<User> = generateEntity<User>({
  schema: fullUserSchema,
  entity: {
    name: 'user',
    label: 'user',
    properties: {
      id: {
        type: 'primary',
        label: 'ID',
      },
      age: {
        type: 'number',
        label: 'Age',
        hooks: {
          list: {
            noFilter: true,
          },
        },
      },
      username: {
        type: 'text',
        label: 'Username',
      },
      email: {
        type: 'text',
        label: 'Email',
      },
      passwordHash: {
        type: 'text',
        label: 'Password',
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
