import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(
      []
    )
  ]
})
export class ShoppingCartModule { }
