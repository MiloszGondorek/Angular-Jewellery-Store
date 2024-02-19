import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';
import { ContactComponent } from './contact/contact.component';
import { StoreComponent } from './store/store.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { CollectionComponent } from './collection/collection.component';
import { BasketComponent } from './basket/basket.component';
import { FavouriteComponent } from './favourite/favourite.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'store/:category', component: StoreComponent },
  { path: 'store/:category/:collection', component: StoreComponent },
  { path: 'store', component: StoreComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'collections', component: CollectionComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: '**', component: Page404Component },
];
