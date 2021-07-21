import { Product } from "../product/product";


// Interface for a Product-Amount pair:
export interface Purchase
{
  // Product:
  product: Product;

  // Amount:
  amount: number;
}


// Interface for a Shopping Cart:
export interface ShoppingCart
{
  // Array to hold Purchases(s):
  purchases: Purchase[];

  // Sum of the Cost ~ this will be updated regularly:
  total: number;

  // Number of Products:
  num_of_products: number;
}
