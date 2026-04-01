import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { ProductListingComponent } from './components/product-listing/product-listing';
import { authGuard } from './auth-guard';
import { WishList } from './components/wish-list/wish-list';
import { CartList } from './components/cart-list/cart-list';

export const routes: Routes = [
  { path: '',         redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',    component: Login },
  { path: 'home',     component: Home},
  { path: 'products', component: ProductListingComponent , canActivate: [authGuard]}, 
  {path: 'cart', component: CartList},
  {path: 'wishlist', component: WishList},
  
  { path: '**',       redirectTo: 'login' }
];
