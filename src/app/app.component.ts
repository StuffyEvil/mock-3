import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from './data-and-extraction/shopping-cart/shopping-cart';
import { ShoppingCartService } from './data-and-extraction/shopping-cart/shopping-cart.service';


@Component(
  {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  // Fields:

  title = 'mock-3';

  // Error Message to store errors.
  errorMessage = '';

  // Shopping Cart Observable:
  shoppingObs$: Observable<ShoppingCart>;

  // cart:
  cart: ShoppingCart;

  // shoppingService Subscription:
  shoppingSub$;


  // Constructor:
  constructor(private shoppingService: ShoppingCartService) {}


  // On Initialization:
  ngOnInit(): void
  {
    // Set up the Shopping Cart Observable.
    this.shoppingObs$ = this.shoppingService.getShoppingCart();

    // Setup Subscription:
    this.shoppingSub$ = this.shoppingObs$.subscribe(
    {
      next: cart =>
      {
        this.cart = cart;
      },
      error: err => this.errorMessage = err
    })
  }
}
