import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';

import { Routes } from '@angular/router';
import { UserDetailComponent } from './user/detail/detail.component';
import { UserListComponent } from './user/user-list/user-list.component';

export const entityRoutes: Routes = [
  {
    path: 'users/list',
    component: UserListComponent,
  },
  {
    path: 'users/detail',
    component: UserDetailComponent,
  },
  {
    path: 'users/detail/:id',
    component: UserDetailComponent,
  },

  {
    path: 'blogs/list',
    component: BlogListComponent,
  },
  {
    path: 'blogs/detail',
    component: BlogDetailComponent,
  },
  {
    path: 'blogs/detail/:id',
    component: BlogDetailComponent,
  },
];
