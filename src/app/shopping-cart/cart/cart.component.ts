import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/data-and-extraction/shopping-cart/shopping-cart';
import { ShoppingCartService } from 'src/app/data-and-extraction/shopping-cart/shopping-cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy
{
  /* --- Fields --- */

  // Error Message to store errors.
  errorMessage = '';


  // Shopping Cart Observable:
  shoppingObs$: Observable<ShoppingCart>;

  // cart:
  cart: ShoppingCart;

  // shoppingService Subscription:
  shoppingSub$;


  //


  // Column Order for Angular Material Table:
  rowTable: string[] = ['imageUrl', 'productName', 'amount',
                        'cost', 'remove']


  // Constructor:
  // Inject ze ShoppingCart Service!
  constructor(private shoppingService: ShoppingCartService,) { }


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


  // On Destruction:
  ngOnDestroy(): void
  {
    // Unsubscribe from shopping.
    this.shoppingSub$.unsubscribe();
  }

}
