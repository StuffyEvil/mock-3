import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/data-and-extraction/category/categories.service';
import { Category } from 'src/app/data-and-extraction/category/category';
import { Product } from 'src/app/data-and-extraction/product/product';
import { ProductsService } from 'src/app/data-and-extraction/product/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy
{
  /* --- Fields --- */

  // Page Title:
  pageTitle = "Product List";

  // Error Message to store errors.
  errorMessage = '';


  // Filtering:
  // Utilizing a BehaviourSubject and Observable to carry out filtering.
  private filterSubject = new BehaviorSubject<string>('');
  filterAction$ = this.filterSubject.asObservable();

  // Filtered string for easier management.
  _listFilter: string = '';

  // Filtered Products array cause I don't know how to use async on
  // combineLatest Observables very well.
  filteredProducts: Product[] = [];


  // Products Observable:
  productsObs$: Observable<Product[]>;



  // Categories:

  // Will have a field to make filtering process later easier.
  categories: Category[] = [];
  _selectedCategory: number = 0;

  // Category Observable:
  categoriesObs$: Observable<Category[]>;
  // Category Subscription:
  categoriesSub$;

  // Category Behaviour:
  private categorySubject = new BehaviorSubject<number>(0);
  categoryAction$ = this.categorySubject.asObservable();


  // An Observable that have multiple things combined together.
  superCombine$;
  // superCombine Subscription:
  superSub$;




  // Constructor:
  // Inject the required elements.
  constructor(private productService: ProductsService,
              private categoryService: CategoriesService,) { }


  // On Initialization:
  ngOnInit(): void
  {
    // Can add some query stuff here.


    // Set up the Product Observable.
    this.productsObs$ = this.productService.getProducts();

    // No need to Subscribe as we don't need to put it out anywhere.


    // Set up Category Observable
    this.categoriesObs$ = this.categoryService.getCategories();

    // Subscribe to set up categories, which makes filtering easier.
    this.categoriesSub$ = this.categoriesObs$.subscribe(
      {
        next: categories =>
        {
          this.categories = categories;
        },
        error: err => this.errorMessage = err
      }
    )


    // Set up superCombine with combineLatest.
    // Combining the product Observable, filter Observable & category
    // Observable.
    this.superCombine$ = combineLatest([
      this.productsObs$,
      this.filterAction$,
      this.categoryAction$,
    ]).pipe(
      // Utilize map such that products are filtered accordingly.
      map(([products, filter, category]) =>
      {
        // First filter by name.

        // Set filter to lower case.
        filter = filter.toLocaleLowerCase();

        // Filter products accordingly.
        products = products.filter(product =>
          product.productName.toLocaleLowerCase().indexOf(filter) !== -1);


        // Then, filter by category.

        // If category is 0, don't filter as it's "all".
        // Otherwise, filter accordingly.
        if (category != 0)
        {
          // Obtain the respective string.
          const catString = this.categories[category - 1].name;

          // Filter products once again, this time by category.
          products = products.filter(product =>
            category ? product.category === catString : false);
        }


        // Since I don't know how to utilize async on a combined
        // Observable, so I am using built-in fields to do output.
        // Set filteredProducts to products.
        this.filteredProducts = products;


        // Signal Flares:
        console.log("Testing 1:", JSON.stringify(products));
        console.log("Testing 2:", JSON.stringify(filter));
        console.log("Testing 3", JSON.stringify(category));
      }),
      catchError(err => {
        // Lob it into console.
        console.log("Something went wrong with combine.");
        return EMPTY;
      }),
    );

    this.superSub$ = this.superCombine$.subscribe({
      next: output => {
        // An empty subscription basically.
        // This will proc the map stuff above and have the filtered
        // products be loaded in.
        // Is there probably a better way to do this? Yeah ...
      }
    })
  }


  // On Destruction:
  ngOnDestroy(): void
  {
    // Unsubscribe accordingly.

    // Unsubscribe from categories.
    this.categoriesSub$.unsubscribe();

    // Unsubscribe from the super combine.
    this.superSub$.unsubscribe();
  }


  // Filter Getter & Setter:

  // Getter:
  get listFilter(): string
  {
    return this._listFilter;
  }

  // Setter:
  set listFilter(value: string)
  {
    // Set accordingly.
    this._listFilter = value;

    // Push to the BehaviourSubject.
    this.filterSubject.next(value);
  }


  // Category Selection:

  // Set Category:
  pushCategory(input: number): void
  {
    // Sets _selectedCategory as input.
    this._selectedCategory = input;

    // Pushes an element to the respective BehaviourSubject.
    this.categorySubject.next(input);
  }
}
