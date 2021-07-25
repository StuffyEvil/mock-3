import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductResolved } from 'src/app/data-and-extraction/product/product';
import { Review, Reviews } from 'src/app/data-and-extraction/review/review';
import { ReviewsService } from 'src/app/data-and-extraction/review/reviews.service';
import { ShoppingCartService } from 'src/app/data-and-extraction/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy
{
  /* - Fields - */

  pageTitle = "Product Detail";
  errorMessage: string = '';

  // Product:
  product: Product;

  // Reviews:
  source: Reviews;
  reviews: Review[] = [];

  // Review Subscription:
  reviewsSub$;


  // # of Products to add:
  _purchaseAmount: number;

  // Add booleans for error checking.
  // I am using this cause I give up on making fancy forms stuff.
  amountIsNull: boolean = true;
  amountAtLeast1: boolean = true;
  amountIsInt: boolean = true;



  // Set up a small FormControl:
  // Since it's so small there's no need to do anything elaborate, as
  // we are only concerned if # of product isn't 0 or null.

  /*
  purchaseFormControl = new FormControl(1,
  [
    Validators.required,
    Validators.min(1),
  ]);

  purchaseFormSub$;

  // Form Error messages:
  formErrorMessage(): string
  {
    // If error is required:
    if (this.purchaseFormControl.hasError('required'))
    {
      return "Please enter in a number.";
    }

    // Else
    return "Please enter in a number at least 1."
  } */




  // Constructor:
  // Inject what is needed.
  constructor(private reviewService: ReviewsService,
              private shoppingService: ShoppingCartService,
              private route: ActivatedRoute,
              private _productSnackBar: MatSnackBar,) { }


  // On Initialization:
  ngOnInit(): void
  {
    // Product Resolved stuff.
    const resolvedData: ProductResolved =
      this.route.snapshot.data['resolvedData'];

    // Error Messages:
    this.errorMessage = resolvedData.error;

    // Product Retrieved:
    this.onProductRetrieved(resolvedData.product);


    // Subscribe to ReviewsService.
    // This should return the type Reviews.
    this.reviewsSub$ =
      this.reviewService.getReviews(this.product.id).subscribe(
      {
        next: reviews =>
        {
          this.source = reviews;
          this.reviews = this.source.reviews;
        },
        error: err => this.errorMessage = err
      }
    );


    // Subscribe to purchaseFormControl.

    /*
    this.purchaseFormSub$ = this.purchaseFormControl.valueChanges.subscribe(
      {
        next: value =>
        {
          // Console Log:
          console.log("Product Amount:", value);

          // Set purchaseAmount accordingly.
          this._purchaseAmount = value;
        }
      }
    ) */

  }


  // On Destruction:
  ngOnDestroy(): void
  {
    // Unsubscribe from ReviewsService.
    this.reviewsSub$.unsubscribe();
  }


  // Retrieved Product Data:
  onProductRetrieved(product: Product): void
  {
    // Set product accordingly.
    this.product = product;

    // Obtain the Product information.
    if (this.product)
    {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    }
    else
    {
      this.pageTitle = 'No Product Found';
    }
  }


  // Getter & Setter for purchaseAmount:

  // Getters:
  get purchaseAmount(): number
  {
    return this._purchaseAmount;
  }

  // Setter:
  set purchaseAmount(amount: number)
  {
    // Set accordingly.
    this._purchaseAmount = amount;


    // Do some manual checking.

    // Check if purchaseAmount is null.
    if (this._purchaseAmount === null)
    {
      this.amountIsNull = true;
      this.amountAtLeast1 = false;
      this.amountIsInt = false;
    }

    // Else, amountIsNull will be false.
    else
    {
      this.amountIsNull = false;

      // Now test the others.


      // Check if purchaseAmount is at least 1.
      if (this._purchaseAmount >= 1)
      {
        this.amountAtLeast1 = true;
      }

      // Else ...
      else
      {
        this.amountAtLeast1 = false;
      }


      // Check if purchaseAmount is an integer.
      if (Number.isInteger(this._purchaseAmount))
      {
        this.amountIsInt = true;
      }

      // Else ...
      else
      {
        this.amountIsInt = false;
      }
    }
  }



  // AddToCart:
  addToCart(): void
  {
    // Using _purchaseAmount, call insertShoppingCart.
    this.shoppingService
      .insertShoppingCart(this.product, this._purchaseAmount);

    // Open a SnackBar.
    this._productSnackBar
      .open("Added " + this._purchaseAmount + " product(s).",
            "Dismiss", { duration: 1500 });
  }
}
