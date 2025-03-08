import { Routes } from '@angular/router';
import { DaisyuiComponent } from './pages/daisyui/daisyui.component';
import { EditEntityInfoComponent } from './pages/edit-entity-info/edit-entity-info.component';
import { entityRoutes } from './pages/entities/routes';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users/list',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'daisyui',
    component: DaisyuiComponent,
  },
  {
    path: 'edit-entity/:entity',
    component: EditEntityInfoComponent,
  },
  ...entityRoutes,
];
