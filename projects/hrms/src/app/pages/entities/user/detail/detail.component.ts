import { Component, input, numberAttribute } from '@angular/core';
import { User } from '@hrms-server/db/schemas';
import { DetailPageComponent, DetailPageConfig } from 'ui-kit';
import { userInfo } from '../../../../entities/user.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [DetailPageComponent],
  template: `
    <lib-detial-page [id]="id()" [config]="config" />
  `,
})
export class UserDetailComponent {
  id = input(undefined, { transform: numberAttribute });
  config: DetailPageConfig<User> = {
    entity: userInfo,
    update: trpc.entities.users.update.mutate,
    create: trpc.entities.users.create.mutate,
    getById: trpc.entities.users.getById.query,
  };
}
