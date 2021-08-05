import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralValidators } from 'src/app/shared/general-validator';

@Component({
  selector: 'app-new-review-dialogue',
  templateUrl: './new-review-dialogue.component.html',
  styleUrls: ['./new-review-dialogue.component.css']
})
export class NewReviewDialogueComponent
{
  // Fields:

  // reviewContent:
  _reviewContent: string;

  // rating:
  _rating: number;

  // ratingFormControl:
  // Form Control for ratings.
  ratingFormControl: FormControl = new FormControl(
  [
    Validators.required,
    GeneralValidators.notInt,
    GeneralValidators.withinRange(0,5),
  ]);


  // Constructor:
  constructor(
    public newReviewDialogueRef: MatDialogRef<NewReviewDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }


  // cancel:
  // Cancels making a new Review.
  cancel(): void
  {
    this.newReviewDialogueRef.close();
  }


  // makeReview:
  // Takes the content of the dialogue and construct a Review, which is
  // then returned.
  makeReview(): void
  {
    // Create the new review
    var newReview = {
      'id': this.data,
      'review': this._reviewContent,
      'rating': this._rating,
    };

    // Close the dialogue with the new review as output.
    this.newReviewDialogueRef.close(newReview);
  }


  // Getters & Setters:

  // reviewContent:

  get reviewContent(): string
  {
    return this._reviewContent;
  }

  set reviewContent(value: string)
  {
    this._reviewContent = value;
  }

  // rating:

  get rating(): number
  {
    return this._rating;
  }

  set rating(value: number)
  {
    this._rating = value;
  }

}
