import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductResolved } from 'src/app/data-and-extraction/product/product';
import { Review, Reviews } from 'src/app/data-and-extraction/review/review';
import { ReviewsService } from 'src/app/data-and-extraction/review/reviews.service';
import { ShoppingCartService } from 'src/app/data-and-extraction/shopping-cart/shopping-cart.service';
import { GeneralValidators } from 'src/app/shared/general-validator';

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
  _purchaseAmount: number = 1;


  // Set up a small FormControl:
  // Since it's so small there's no need to do anything elaborate, as
  // we are only concerned if # of product isn't 0 or null.

  purchaseFormControl = new FormControl(1,
  [
    Validators.required,
    Validators.min(1),
    GeneralValidators.notInt(),
  ]);

  purchaseFormSub$;




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
    );

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
