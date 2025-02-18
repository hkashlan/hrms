import { Routes } from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listing',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'listing',
    component: ListingPageComponent,
  },
  {
    path: 'details',
    component: DetailPageComponent,
  },
];
