import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Review, Reviews } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService implements OnDestroy
{
  // Fields:

  // Obtain the Product Data.
  private reviewsUrl = 'api/reviews';

  // Reviews Observable from the false database:
  reviewsObs$: Observable<Reviews[]>;

  // Reviews data:
  reviewsData: Reviews[];

  // Reviews subscription:
  reviewsSub$;


  // Constructor:
  constructor(private http: HttpClient)
  {
    // Add the appropriate Reviews.
    const url = `${this.reviewsUrl}`;

    // Obtain Reviews data from the false database.
    this.reviewsObs$ = this.http.get<Reviews[]>(url);

    // Subscribe accordingly.
    this.reviewsSub$ = this.reviewsObs$.subscribe(
    {
      next: reviews => {
        this.reviewsData = reviews;
      }
    })
  }


  // OnDestroy:
  ngOnDestroy()
  {
    // Unsubscribe accordingly.
    this.reviewsSub$.unsubscribe();
  }


  // Review Getters:

  // For a certain Product
  getReviews(id: number): Observable<Reviews>
  {
    // Add the appropriate Reviews.
    const url = `${this.reviewsUrl}/${id}`;

    // Return Observable of reviewOutput.
    return this.http.get<Reviews>(url)
      .pipe(
        tap(data => console.log('getReviews: ' + JSON.stringify(data))),
        catchError(this.handleError),
        shareReplay(3),
      )
  }


  // HandleError
  private handleError(err)
  {
    // Normally this would be a lot more fancy, logging errors into a
    // remote database instead of only to console.
    let errorMessage: string;

    if (err.error instanceof ErrorEvent)
    {
      // Handle client-side / network error.
      errorMessage = `An error occurred: ${err.error.message}`;
    }

    else
    {
      // The backend returned an unsuccessful response code.
      // Returned message may give an idea of the reason for error.
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }

    console.error(err);
    // Return accordingly
    return throwError(errorMessage);
  }



  // CRUD:


  // createReview:
  createReview(id: number, review: string, rating: number): void
  {
    // Create a Review with the inputs:
    var insert: Review = {
      "id": id,
      "review": review,
      "rating": rating,
    };

    // Obtain index of the respective Reviews.
    var index: number = this.reviewsData.findIndex(
      (reviews) => reviews.id == id
    );


    // If index is -1, create a Reviews and insert it.
    if (index == -1)
    {
      // Create a Reviews.
      var newReviews: Reviews = {
        "id": id,
        "reviews": [],
        "ratingOverall": rating,
      }

      // Insert the new Review into the new Reviews.
      newReviews.reviews.push(insert);

      // Insert the new Reviews into this.reviewsData.
      this.reviewsData.push(newReviews);
    }


    // Else, insert the Review normally.
    else
    {
      // As such, add the new review to the respective Reviews.
      this.reviewsData[index].reviews.push(insert);

      // Adjust the ratingOverall of the Reviews.
      this.reviewsData[index].ratingOverall =
         (this.reviewsData[index].reviews.length
         * this.reviewsData[index].ratingOverall + rating) /
         (this.reviewsData.length + 1);
    }
  }


  // deleteReview:
  // Return true of deletion is a success, false otherwise.
  deleteReview(id: number, review: Review): boolean
  {
    // Obtain the index of the respective Reviews.
    var indexReviews: number = this.reviewsData.findIndex(
      (reviews) => reviews.id == id
    );

    // If indexReviews is -1, the Reviews doesn't exist for whatever
    // reason.
    if (indexReviews == -1)
    {
      return false;
    }

    // Obtain the index of the respective Review in the Reviews.
    var indexReview: number =
          this.reviewsData[indexReviews].reviews.indexOf(review);

    // If indexReview is -1, the Review doesn't exist for whatever reason.
    if (indexReview == -1)
    {
      return false;
    }

    // Else, delete the Review accordingly.
    else
    {
      this.reviewsData[indexReviews].reviews.splice(indexReview, 1);

      return true;
    }
  }


  // updateReview:
  // Take the original review, and the new elements.
  updateReview(id: number, original: Review,
               newer: string, rating: number): boolean
  {
    // Obtain the index of the respective Reviews.
    var indexReviews: number = this.reviewsData.findIndex(
      (reviews) => reviews.id == id
    );

    // If indexReviews is -1, the Reviews doesn't exist for whatever
    // reason.
    if (indexReviews == -1)
    {
      return false;
    }

    // Obtain the index of the respective Review in the Reviews.
    var indexReview: number =
      this.reviewsData[indexReviews].reviews.indexOf(original);

    // If indexReview is -1, the Review doesn't exist for whatever reason.
    if (indexReview == -1)
    {
      return false;
    }

    // Else, the review in question must exist, and we should adjust it
    // accordingly.
    else
    {
      // Change the Review string.
      this.reviewsData[indexReviews].reviews[indexReview].review = newer;

      // Change the ratingOverall.
      this.reviewsData[indexReviews].ratingOverall =
         (this.reviewsData[indexReviews].reviews.length *
         this.reviewsData[indexReviews].ratingOverall -
         this.reviewsData[indexReviews].reviews[indexReview].rating
         + rating) / this.reviewsData.length;

      // Change the rating.
      this.reviewsData[indexReviews].reviews[indexReview].rating =
          rating;

      // Return true.
      return true;
    }
  }

}
