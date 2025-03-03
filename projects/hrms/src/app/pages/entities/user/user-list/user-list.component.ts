import { Component } from '@angular/core';
import { curdActions, DataGridComponent, entityUrlResource } from 'ui-kit';
import { userInfo } from '../../../../entities/user.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [DataGridComponent],
  template: `
    <lib-data-grid [entity]="userInfo" [data]="users.value() ?? []" [actions]="actions" />
  `,
})
export class UserListComponent {
  userInfo = userInfo;

  users = entityUrlResource(trpc.entities.user.list.query);

  actions = curdActions;
}
