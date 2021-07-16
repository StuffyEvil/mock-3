import { Product } from "../product/product";

// Interface for a Shopping Cart
export interface ShoppingCart
{
  // Array to hold Product(s):
  products: Product[];

  // Array to hold the amount of Product(s) of the corresponding index.
  amount: number[];

  // Sum of the Cost ~ this will be updated regularly:
  total: number;
}
