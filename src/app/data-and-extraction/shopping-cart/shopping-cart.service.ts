import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Product } from '../product/product';
import { Purchase, ShoppingCart } from './shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService
{
  // There is no data to obtain.

  // Field to hold a shopping cart.
  cart: ShoppingCart =
  {
    "purchases": [],
    "total": 0,
    "num_of_products": 0,
  };

  // Observable of that cart.
  cartObservable: Observable<ShoppingCart> = of(this.cart)
    .pipe(
      tap(data => console.log('getShoppingCart: ' + JSON.stringify(data))),
      catchError(this.handleError),
      shareReplay(1),
    );


  // Inject ze HttpClient!
  constructor(private http: HttpClient) {}


  // Shopping Cart Getter:
  getShoppingCart(): Observable<ShoppingCart>
  {
    // Just return cart.
    return this.cartObservable;
  }


  // Shopping Cart Inserter:
  // Takes in Product and number as argument to add them to the cart.
  insertShoppingCart(product: Product, amount: number): void
  {
    console.log("Shopping Cart Adding");

    // Use findIndex to find if Product is already in the array.
    var index: number = this.cart.purchases.findIndex(
      (purchase) => purchase.product == product );


    // If index is -1, then use push to insert the Product and amount.
    if (index == -1)
    {
      // Create a new Purchase to be pushed.
      var insert: Purchase = { "product": product, "amount": amount };

      // Insert accordingly.
      this.cart.purchases.push(insert);
    }

    // Else, add amount to the respective value.
    else
    {
      // Add accordingly.
      this.cart.purchases[index].amount += amount;
    }

    // Update total & num_of_products.
    this.cart.total += amount * product.price;
    this.cart.num_of_products += amount;
  }


  // Shopping Cart Remover:
  // Takes in Product and number as argument to add them to the cart.
  removeShoppingCart(product: Product, amount: number): void
  {
    console.log("Shopping Cart Removing");

    // Use findIndex to find if Product is already in the array.
    // Note that it's impossible to not get a hit as the remove function
    // can only be conducted on elements in cart.
    var index: number = this.cart.purchases.findIndex(
      (purchase) => purchase.product == product );


    // If amount is equal or greater than the amount in the cart.
    if (amount >= this.cart.purchases[index].amount)
    {
      // Update total & num_of_products.
      this.cart.total -= this.cart.purchases[index].amount * product.price;
      this.cart.num_of_products -= this.cart.purchases[index].amount;

      // Remove the respective value in purchase.
      this.cart.purchases.splice(index, 1);

      console.log(this.cart);
    }


    // Else, just subtract accordingly.
    else
    {
      // Remove amount.
      this.cart.purchases[index].amount -= amount;

      // Update total & num_of_products.
      this.cart.total -= amount * product.price;
      this.cart.num_of_products -= amount;
    }

  }


  // HandleError:
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
