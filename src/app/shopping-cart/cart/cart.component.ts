import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Product } from 'src/app/data-and-extraction/product/product';
import { Purchase, ShoppingCart } from 'src/app/data-and-extraction/shopping-cart/shopping-cart';
import { ShoppingCartService } from 'src/app/data-and-extraction/shopping-cart/shopping-cart.service';
import { GeneralValidators } from 'src/app/shared/general-validator';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy
{
  /* --- Fields --- */


  @ViewChild(MatTable) table: MatTable<Purchase>

  // Column Order for Angular Material Table:
  rowTable: string[] = ['imageUrl', 'productName',
                        'amount', 'cost', 'remove']


  // Error Message to store errors.
  errorMessage = '';


  // Shopping Cart Observable:
  shoppingObs$: Observable<ShoppingCart>;

  // cart:
  cart: ShoppingCart;

  // shoppingService Subscription:
  shoppingSub$;

  // Shopping Cart String:
  shoppingCartString: string;


  // Set up FormControl array.
  formArray: FormArray;



  // Constructor:
  // Inject ze ShoppingCart Service!
  constructor(private shoppingService: ShoppingCartService,) { }


  // On Initialization:
  ngOnInit(): void
  {
    // Set up formArray.

    // Set up insert.
    var formInsert: FormControl[] = [];

    // Construct new formArray.
    this.formArray = new FormArray(formInsert);


    // Set up the Shopping Cart Observable.
    this.shoppingObs$ = this.shoppingService.getShoppingCart();

    // Setup Subscription:
    this.shoppingSub$ = this.shoppingObs$.subscribe(
    {
      next: cart =>
      {
        // Console Logs:
        console.log("next:");

        // Set Cart:
        this.cart = cart;

        // Call assembleForms:
        this.assembleForms();

        // Console Logs:
        console.log("Shopping Cart:", JSON.stringify(cart));
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


  // assembleForms:
  // Adjust arrayFormControl such that the amount it has matches the
  // amount of unique products in the cart.
  assembleForms(): void
  {
    // Console Logs:
    console.log("Entering assembleForms()");


    // Set up arrayFormControl accordingly.

    // Obtain the difference between the length of formArray and # of
    // unique products.
    var difference: number = this.formArray.length
                              - this.cart.purchases.length;


    // If difference is negative, add FormControl(s).
    if (difference < 0)
    {
      // Add FormControls to formArray.
      for (let loop = 0; loop < difference * -1; ++ loop)
      {
        this.formArray.push(new FormControl(1, [
          GeneralValidators.notInt(),
        ]));
      }
    }


    // Else if, difference is positive, remove FormControl(s).
    if (difference > 0)
    {
      // Remove FormControls from formArray.
      for (let loop = 0; loop < difference; ++ loop)
      {
        this.formArray.removeAt(0);
      }
    }

    // Else, difference is 0, do nothing.


    // Console Logs:
    console.log("Size of formArray:", this.formArray.length);


    // Now align the values between the cart and the array.
    for (let loop = 0; loop < this.cart.purchases.length; ++ loop)
    {
      this.formArray.at(loop).setValue(this.cart.purchases[loop].amount);
    }
  }


  // onAmountChange:
  // Takes in a product, an amount, the respective purchase for it, and
  // acts accordingly.
  onAmountChange(product: Product,  purchase: Purchase): void
  {
    // Obtain the index and the corresponding value.
    var amount: number = this.formArray.at(this.index(purchase)).value;


    // Console Logs:
    console.log("Amount for", product.productName, "is", amount);


    // If amount is null then just remove the product.
    if (amount === null)
    {
      // Remove product.
      this.shoppingService.removeShoppingCart(product, purchase.amount);

      // Updates the amount of forms.
      this.assembleForms();

      // Updates the table.
      this.table.renderRows();
    }


    // Check if amount is an integer.
    if (Number.isInteger(amount))
    {
      // Obtain the difference between new amount and current.
      var difference: number = purchase.amount - amount;


      // If difference is positive, then remove.
      if (difference > 0)
      {
        // Call removeShoppingCart.
        this.shoppingService.removeShoppingCart(product,
                                purchase.amount - amount);

        if (amount == 0)
        {
          // Updates the amount of forms.
          this.assembleForms();

          // Updates the table.
          this.table.renderRows();
        }
      }


      // Else if, difference is negative, then add.
      else if (difference < 0)
      {
        // Call insertShoppingCart.
        this.shoppingService.insertShoppingCart(product,
                                amount - purchase.amount);
      }


      // Else, difference must be 0, do nothing.
    }
  }


  // index:
  // Takes in a purchase and returns the index of it.
  index(purchase: Purchase): number
  {
    return this.cart.purchases.indexOf(purchase);
  }


  removeProduct(product: Product, amount: number): void
  {
    // Remove product.
    this.shoppingService.removeShoppingCart(product, amount);

    // Updates the amount of forms.
    this.assembleForms();

    // Updates the table.
    this.table.renderRows();
  }

}
