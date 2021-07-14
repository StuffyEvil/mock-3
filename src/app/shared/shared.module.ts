import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations:
  [
    ConvertToSpacesPipe,
    StarRatingComponent
  ],
  imports:
  [
    CommonModule,
    MaterialModule,
  ],
  exports:
  [
    CommonModule,
    FormsModule,
    ConvertToSpacesPipe,
    StarRatingComponent,
  ]
})
export class SharedModule { }
