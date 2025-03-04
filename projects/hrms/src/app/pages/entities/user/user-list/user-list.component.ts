import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { curdActions, DataGridComponent, entityUrlResource } from 'ui-kit';
import { userInfo } from '../../../../entities/user.entity';
import { trpc } from '../../../../trpc.client';
import { HeroIcons } from './../../../../icon';

@Component({
  imports: [DataGridComponent, RouterModule],
  template: `
    <div class="flex justify-between items-center mb-4 bg-primary text-white p-4">
      <h1 class="text-2xl font-bold">{{ userInfo.label }} management</h1>
      <button class="btn btn-circle" [routerLink]="'../detail'">
        <img [src]="icons.plusCircle" class="size-full" />
      </button>
    </div>
    <lib-data-grid [entity]="userInfo" [data]="users.value() ?? []" [actions]="actions" />
  `,
})
export class UserListComponent {
  icons = HeroIcons;
  userInfo = userInfo;

  users = entityUrlResource(trpc.entities.user.list.query);

  actions = curdActions;
}
