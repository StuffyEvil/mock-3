import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
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


  // Set up theme changing elements, or at least try.
  @HostBinding('class') componentCssComponent;

  // Boolean to see which is the current theme.
  // If it's false then it's Light, it it's true it's Dark.
  themeToggle: boolean;



  // Constructor:
  constructor(private shoppingService: ShoppingCartService,
              public overlayContainer: OverlayContainer) {}


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


  // ToggleTheme:
  // For changing the theme accordingly.
  toggleTheme(): void
  {
    // If themeToggle is true, it's dark-theme so switch to light-theme.
    if (this.themeToggle)
    {
      // Change Theme:
      this.overlayContainer.getContainerElement().
        classList.add('light-theme');
      this.componentCssComponent = 'light-theme';

      // Toggle themeToggle.
      this.themeToggle = !(this.themeToggle);
    }

    // Else, themeToggle is false, so go from light-theme to dark-theme.
    else
    {
      // Change Theme:
      this.overlayContainer.getContainerElement().
        classList.add('dark-theme');
      this.componentCssComponent = 'dark-theme';

      // Toggle themeToggle.
      this.themeToggle = !(this.themeToggle);
    }
  }
}
