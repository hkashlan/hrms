import { fullUserSchema, User } from '@hrms-server/db/schemas/users.schema';
import { Entity, generateEntity } from 'ui-kit';
import { AgeComponent } from '../pages/entities/user/detail/age/age.component';

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
      age: {
        type: 'number',
        label: 'Age',
        hooks: {
          details: {
            component: AgeComponent,
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
