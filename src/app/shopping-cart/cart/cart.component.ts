import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable, } from 'rxjs';
import { catchError } from 'rxjs/operators';
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


  // Remove Button Behaviour:
  // Value that the Behaviour passes is irrelevant, the important thing is
  // to shoot a signal flare that a change has occured.
  private removeSubject = new BehaviorSubject<number>(0);
  removeAction$ = this.removeSubject.asObservable();


  // An Observable that combines ShoppingCart & removeAction.
  superCombine$;

  // superCombine Subscription:
  superSub$;



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


    // Setup superCombine:
    this.superCombine$ = combineLatest([
      this.shoppingObs$,
      this.removeAction$,
    ]).pipe(
      catchError(err => {
        // Lob it into console.
        console.log("Something went wrong with combine.");
        return EMPTY;
      })
    );


    // Set up superCombine Subscription:
    this.superSub$ = this.superCombine$.subscribe({
      next: ([output1, output2]) =>
      {
        // Console Output:
        console.log("SuperCombine Output:", JSON.stringify(output1));

        // Set cart accordingly.
        this.cart = output1;
      }
    })
  }


  // On Destruction:
  ngOnDestroy(): void
  {
    // Unsubscribe from shopping.
    this.superSub$.unsubscribe();
  }

}
