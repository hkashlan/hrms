import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';

import { Routes } from '@angular/router';
import { UserDetailComponent } from './user/detail/detail.component';
import { UserListComponent } from './user/user-list/user-list.component';

export const entityRoutes: Routes = [
  {
    path: 'user/list',
    component: UserListComponent,
  },
  {
    path: 'user/detail',
    component: UserDetailComponent,
  },
  {
    path: 'user/detail/:id',
    component: UserDetailComponent,
  },

  {
    path: 'blog/list',
    component: BlogListComponent,
  },
  {
    path: 'blog/detail',
    component: BlogDetailComponent,
  },
  {
    path: 'blog/detail/:id',
    component: BlogDetailComponent,
  },
];
