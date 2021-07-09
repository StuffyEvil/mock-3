// Basically the same as that from PluralSight, as no change is needed.
export interface Product
{
  id: number;
  productName: string;
  productCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  rating: number;
  imageUrl: string;
}

// Extra interface for processed Product data
export interface ProductResolved
{
  product: ProductResolved;
  error?: any;
}
