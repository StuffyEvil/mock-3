import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule(
  {
  declarations: [],
  imports: [
    SharedModule,
    MaterialModule,
  ]
})
export class ProductsModule { }
