import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService
{
  // Obtain the Product Data.
  private productsUrl = 'api/products';

  // Inject that HttpClient
  constructor(private http: HttpClient) { }


  // Product Getters:

  // All Products
  getProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError),
        shareReplay(1),
      );
  }

  // A single Product
  getProduct(id: number): Observable<Product>
  {
    if (id === 0)
    {
      return of(this.initializeProduct());
    }

    const url = `${this.productsUrl}/${id}`;

    return this.http.get<Product>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError),
        shareReplay(3),
      );
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


  // Initializing Product
  private initializeProduct(): Product
  {
    // Return an initialized object
    return {
      id: 0,
      productName: null,
      productCode: null,
      category: null,
      tags: [],
      releaseDate: null,
      price: null,
      description: null,
      rating: null,
      imageUrl: null,
    }
  }
}
