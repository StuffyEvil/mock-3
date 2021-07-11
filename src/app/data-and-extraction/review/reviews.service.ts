import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Review, Reviews } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService
{
  // Obtain the Product Data.
  private reviewsUrl = 'api/reviews';

  // Inject that HttpClient
  constructor(private http: HttpClient) { }


  // Review Getters:

  // For a certain Product
  getReviews(id: number): Observable<Reviews>
  {
    // Can add review initialization later.

    // Set up output variable.
    // var reviewOutput: Review[] = [];

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
}
