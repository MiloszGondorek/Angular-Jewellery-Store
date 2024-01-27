import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';
import { ContactComponent } from './contact/contact.component';
import { StoreComponent } from './store/store.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'store/:category', component: StoreComponent },
  { path: 'store', component: StoreComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: '**', component: Page404Component },
];
