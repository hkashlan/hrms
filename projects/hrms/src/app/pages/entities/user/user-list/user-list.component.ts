import { Component } from '@angular/core';
import { DataGridComponent } from 'ui-kit';
import { userInfo } from '../../../../entities/user.entity';
import { trpc } from '../../../../trpc.client';
import { entityUrlResource } from '../../../../utils/entity-resource';

@Component({
  imports: [DataGridComponent],
  template: `
    <lib-data-grid [entity]="userInfo" [data]="users.value() ?? []" />
  `,
})
export class UserListComponent {
  userInfo = userInfo;

  users = entityUrlResource(trpc.entities.user.list.query);
}
