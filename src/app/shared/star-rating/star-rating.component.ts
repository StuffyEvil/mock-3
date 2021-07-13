import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges
{
  // Fields:

  // Input:
  @Input() rating = 0;

  starWidth;

  // Output:
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();


  // On Change:
  ngOnChanges(): void
  {
    this.starWidth = this.rating * 75 / 5;
  }
}
