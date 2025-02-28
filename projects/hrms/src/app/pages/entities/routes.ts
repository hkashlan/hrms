import { Routes } from '@angular/router';
import { UserDetailComponent } from './user/detail/detail.component';
import { UserListComponent } from './user/user-list/user-list.component';

export const entityRoutes: Routes = [
  {
    path: 'user/list',
    component: UserListComponent,
  },
  {
    path: 'user/detail/:id',
    component: UserDetailComponent,
  },
];
