import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductResolved } from 'src/app/data-and-extraction/product/product';
import { Review, Reviews } from 'src/app/data-and-extraction/review/review';
import { ReviewsService } from 'src/app/data-and-extraction/review/reviews.service';

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


  // Constructor:
  // Inject what is needed.
  constructor(private reviewService: ReviewsService,
              private route: ActivatedRoute) { }


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

  }


  // On Destruction:
  ngOnDestroy(): void
  {
    // Unsubscribe from ReviewsService.
    this.reviewsSub$.unsubscribe();
  }

}
