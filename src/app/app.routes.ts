import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { ProductListingComponent } from './components/product-listing/product-listing';

export const routes: Routes = [
  { path: '',         redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',    component: Login },
  { path: 'home',     component: Home},
  { path: 'products', component: ProductListingComponent },  // ✅ Add this
  { path: '**',       redirectTo: 'login' }
];