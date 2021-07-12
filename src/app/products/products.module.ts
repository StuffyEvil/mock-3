import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule(
  {
  declarations: [
    ProductListComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(
      [
        {
          path: ' ',
          component: ProductListComponent
        },
      ]
    )
  ]
})
export class ProductsModule { }
