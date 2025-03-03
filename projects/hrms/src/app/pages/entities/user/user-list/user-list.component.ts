import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@hrms-server/db/schamas';
import { DataGridComponent, entityUrlResource } from 'ui-kit';
import { ActionButton } from '../../../../../../../ui-kit/src/lib/data-grid/data-grid';
import { userInfo } from '../../../../entities/user.entity';
import { HeroIcons } from '../../../../icon';
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

  actions: ActionButton<User>[] = [
    {
      icon: HeroIcons.pencil,
      action: (row) => {
        const activatedRoute = inject(ActivatedRoute);
        inject(Router).navigate(['./detail', row.id], { relativeTo: activatedRoute });
      },
    },
    {
      icon: HeroIcons.trash,
      action: (row) => {
        console.log('Delete', row);
      },
    },
  ];
}
