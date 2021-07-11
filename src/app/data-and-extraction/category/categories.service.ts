import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService
{
  // Obtain the Category Data.
  private categoriesUrl = 'api/categories';

  // Inject that HttpClient
  constructor(private http: HttpClient) { }


  // Category Getters:

  // There's only one, that gives all the categories.
  // Category data is used for a way to easier see all existing categories.
  getCategories(): Observable<Category[]>
  {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError),
        shareReplay(1),
      );
  }


  // HandleError
  private handleError(err)
  {
    // Normally this would be fancier with logging errors into a remote
    // database, but it's console logs instead.
    let errorMessage: string;

    if (err.error instanceof ErrorEvent)
    {
      // Handle client-side / network error.
      errorMessage = `An error occurred: ${err.error.message}`;
    }

    else
    {
      // The backend returned an unsuccessful respone code.
      // Returned message may give an idea of the reason for error.
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }

    console.error(err);
    // Returned accordingly
    return throwError(errorMessage);
  }
}
