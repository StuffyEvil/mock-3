import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages-archive/about-us/about-us.component';
import { HomeComponent } from './pages-archive/home/home.component';
import { PageNotFoundComponent } from './pages-archive/page-not-found/page-not-found.component';
import { QAComponent } from './pages-archive/q-a/q-a.component';

const routes: Routes =
[
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'q-a', component: QAComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module')
        .then(m => m.ShoppingCartModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
