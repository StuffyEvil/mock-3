import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations:
  [
    ConvertToSpacesPipe
  ],
  imports:
  [
    CommonModule
  ],
  exports:
  [
    CommonModule,
    FormsModule,
    ConvertToSpacesPipe,
  ]
})
export class SharedModule { }
