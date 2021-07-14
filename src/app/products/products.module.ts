import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductResolverService } from '../data-and-extraction/product/product-resolver.service';



@NgModule(
  {
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: ProductListComponent
        },
        {
          path: ':id',
          component: ProductDetailComponent,
          resolve: { resolvedData: ProductResolverService }
        }
      ]
    )
  ]
})
export class ProductsModule { }
