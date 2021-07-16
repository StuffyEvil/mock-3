import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product/product';
import { ShoppingCart } from './shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService
{
  // There is no data to obtain.

  // Field to hold a shopping cart.
  cart: ShoppingCart =
  {
    "products": [],
    "amount": [],
    "total": 0,
  };


  // Inject ze HttpClient!
  constructor(private http: HttpClient) {}


  // Shopping Cart Getter:
  getShoppingCart(): ShoppingCart
  {
    // Just return cart.
    return this.cart;
  }


  // Shopping Cart Inserter:
  // Takes in Product and number as argument to add them to the cart.
  insertShoppingCart(product: Product, amount: number): void
  {
    // Use indexOf to find if Product is already in the array.
    var index: number = this.cart.products.indexOf(product);


    // If index is -1, then use push to insert the Product and amount.
    if (index == -1)
    {
      // Insert accordingly.
      this.cart.products.push(product);
      this.cart.amount.push(amount);
    }

    // Else, add amount to the respective value.
    else
    {
      // Add accordingly.
      this.cart.amount[index] += amount;
    }

    // Update total.
    this.cart.total += amount * product.price;
  }


  // Shopping Cart Remover:
  // Takes in Product and number as argument to add them to the cart.
  removeShoppingCart(product: Product, amount: number): void
  {
    // Use indexOf to find the Product and remove amount accordingly.
    // Note that it's impossible to not get a hit as the remove function
    // can only be conducted on elements in cart.
    var index: number = this.cart.products.indexOf(product);


    // Update total.
    this.cart.total -= this.cart.amount[index] * product.price;

    // If amount is equal or greater than the amount in the cart.
    if (amount >= this.cart.amount[index])
    {
      // Remove the respective value in both product and amount.
      this.cart.products.splice(index, 1);
      this.cart.amount.splice(index,1);
    }

    // Else, just subtract accordingly.
    else
    {
      // Remove amount.
      this.cart.amount[index] -= amount;
    }
  }
}
