import { fullUserSchema, User } from '@hrms-server/db/schamas/users';
import { Entity, generateEntity } from 'ui-kit';

export const userInfo: Entity<User> = generateEntity<User>({
  schema: fullUserSchema,
  entity: {
    name: 'User',
    properties: {
      id: {
        type: 'primary',
        label: 'ID',
      },
      age: {
        type: 'number',
        label: 'Age',
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
      },
    },
  },
});
