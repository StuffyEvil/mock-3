import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
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

  // Error Message to store errors.
  errorMessage = '';


  // Shopping Cart Observable:
  shoppingObs$: Observable<ShoppingCart>;

  // cart:
  cart: ShoppingCart;

  // shoppingService Subscription:
  shoppingSub$;


  // Set up FormControl array.
  formArray: FormArray;

  // # of unique Products in the cart.
  numOfUProducts: number = 0;


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
        // Set Cart:
        this.cart = cart;

        // Set amount of unique products:
        this.numOfUProducts = cart.purchases.length;

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

    // Set up insert.
    var formInsert: FormControl[] = [];

    // If formArray has stuff, clear it.
    if(this.formArray)
    {
      this.formArray.clear;
    }

    // Construct new formArray.
    this.formArray = new FormArray(formInsert);


    for (let loop = 0; loop < this.numOfUProducts; ++ loop)
    {
      this.formArray.push(new FormControl(1, [
        GeneralValidators.notInt(),
      ]));
    }


    // Console Logs:
    console.log("Size of formArray:", this.formArray.length);


    // Now align the values between the cart and the array.
    for (let loop = 0; loop < this.numOfUProducts; ++ loop)
    {
      this.formArray[loop].setValue(this.cart.purchases[loop].amount);
    }
  }


  // onAmountChange:
  // Takes in a product, an amount, the respective purchase for it, and
  // acts accordingly.
  onAmountChange(product: Product,  purchase: Purchase): void
  {
    // Obtain the index and the corresponding value.
    var amount: number = this.formArray[this.index(purchase)].value;


    // Console Logs:
    console.log("Amount for", product.productName, "is", amount);


    // If amount is null then just remove the product.
    if (amount === null)
    {
      this.shoppingService.removeShoppingCart(product, purchase.amount);
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
}
