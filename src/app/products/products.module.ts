import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule(
  {
  declarations: [],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(
      [

      ]
    )
  ]
})
export class ProductsModule { }
