import { Component } from '@angular/core';
import { ListPageComponent } from 'ui-kit';
import { userInfo } from '../../../../entities/user.entity';
import { trpc } from '../../../../trpc.client';

@Component({
  imports: [ListPageComponent],
  template: `
    <lib-list-page [entity]="userInfo" [fn]="fn" />
  `,
})
export class UserListComponent {
  userInfo = userInfo;
  fn = trpc.entities.user.list.query;
}
