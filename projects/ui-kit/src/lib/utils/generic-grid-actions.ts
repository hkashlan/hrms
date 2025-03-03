import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroIcons } from '../../../../hrms/src/app/icon';
import { ActionButton } from '../data-grid/data-grid';

export const curdActions: ActionButton<any>[] = [
  {
    icon: HeroIcons.pencil,
    action: (row) =>
      inject(Router).navigate(['../detail', row.id], { relativeTo: inject(ActivatedRoute) }),
  },
  {
    icon: HeroIcons.trash,
    action: (row) => {
      console.log('Delete', row);
    },
  },
];
