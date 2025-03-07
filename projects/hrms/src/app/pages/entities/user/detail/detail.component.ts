import { Component, input, numberAttribute } from '@angular/core';
import { User } from '@hrms-server/db/schamas';
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
    update: trpc.entities.user.update.mutate,
    create: trpc.entities.user.create.mutate,
    getById: trpc.entities.user.getById.query,
  };
}
