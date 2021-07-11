import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './category/category';
import { Product } from './product/product';
import { Reviews } from './review/review';

export class Data implements InMemoryDbService
{
    // Create the database.
    createDb()
    {
        // Products
        const products: Product[] =
        [
            {
                "id": 1,
                "productName": "Black Tea",
                "productCode": "TEA-001",
                "category": "Black",
                "releaseDate": "June 07, 2021",
                "description": "Black Tea is in fact Black & Tea",
                "price": 9.99,
                "rating": 4.1,
                "imageUrl": "assets/images/Black Tea.jpg"
            },
            {
                "id": 2,
                "productName": "Green Tea",
                "productCode": "TEA-002",
                "category": "Green",
                "releaseDate": "June 07, 2021",
                "description": "Green Tea is in fact Green & Tea",
                "price": 9.99,
                "rating": 4.2,
                "imageUrl": "assets/images/Green Tea.jpg"
            },
            {
                "id": 3,
                "productName": "White Tea",
                "productCode": "TEA-003",
                "category": "White",
                "releaseDate": "June 07, 2021",
                "description": "White Tea is in fact White & Tea",
                "price": 9.99,
                "rating": 3.9,
                "imageUrl": "assets/images/White Tea.jpg"
            },
            {
                "id": 4,
                "productName": "Yellow Tea",
                "productCode": "TEA-004",
                "category": "Yellow",
                "releaseDate": "June 07, 2021",
                "description": "Yellow Tea is in fact Yellow & Tea",
                "price": 9.99,
                "rating": 3.7,
                "imageUrl": "assets/images/Yellow Tea.png"
            },
            {
                "id": 5,
                "productName": "Oolong Tea",
                "productCode": "TEA-005",
                "category": "Oolong",
                "releaseDate": "June 07, 2021",
                "description": "Oolong Tea is in fact Oolong & Tea",
                "price": 12.99,
                "rating": 4.5,
                "imageUrl": "assets/images/Oolong Tea.jpg"
            },
            {
                "id": 6,
                "productName": "Pu-erh Tea",
                "productCode": "TEA-006",
                "category": "Pu-erh",
                "releaseDate": "June 07, 2021",
                "description": "Pu-erh Tea is in fact Pu-erh & Tea",
                "price": 9.99,
                "rating": 4.0,
                "imageUrl": "assets/images/Pu-erh Tea.jpg"
            }
        ]; // Product data


        // Reviews
        const reviews: Reviews[] =
        [
            {
                "id": 1,
                "reviews": [
                    {
                        "id": 1,
                        "review": "Nice flagrence and colour",
                        "rating": 4,
                    },
                    {
                        "id": 1,
                        "review": "Black tea is a type of tea that is more oxidized than oolong, yellow, white and green teas. Black tea is generally stronger in flavor than other teas. All five types are made from leaves of the shrub (or small tree) Camellia sinensis. Two principal varieties of the species are used – the small-leaved Chinese variety plant (C. sinensis var. sinensis), used for most other types of teas, and the large-leaved Assamese plant (C. sinensis var. assamica), which was traditionally mainly used for black tea, although in recent years some green and white teas have been produced. In China, where black tea was developed, the beverage is called 紅茶 (red tea), due to the color of the oxidized leaves when processed appropriately.",
                        "rating": 3,
                    },
                    {
                        "id": 1,
                        "review": "Made bricks out of these",
                        "rating": 5,
                    },
                ],
                "ratingOverall": 0,
            },
            {
                "id": 2,
                "reviews": [
                    {
                        "id": 2,
                        "review": "Not Green Enough",
                        "rating": 3,
                    },
                    {
                        "id": 2,
                        "review": "Very Nice",
                        "rating": 4,
                    },
                ],
                "ratingOverall": 0,
            },
            {
                "id": 3,
                "reviews": [
                    {
                        "id": 3,
                        "review": "Excellent Product",
                        "rating": 4,
                    },
                ],
                "ratingOverall": 0,
            },
            {
                "id": 4,
                "reviews": [
                    {
                        "id": 4,
                        "review": "Really Really Tasty",
                        "rating": 4,
                    },
                    {
                        "id": 4,
                        "review": "I thought this is Lemonade",
                        "rating": 1,
                    },
                    {
                        "id": 4,
                        "review": "Okay I drank it a bit more and it's nice",
                        "rating": 4,
                    },
                ],
                "ratingOverall": 0,
            },
            {
                "id": 5,
                "reviews": [
                    {
                        "id": 5,
                        "review": "OOLONG TEA BEST TEA",
                        "rating": 5,
                    },
                    {
                        "id": 5,
                        "review": "Oolong Tea is good, but that's a dumb statement",
                        "rating": 4,
                    },
                ],
                "ratingOverall": 0,
            },
            {
                "id": 6,
                "reviews": [
                    {
                        "id": 6,
                        "review": "It's okay",
                        "rating": 4,
                    },
                ],
                "ratingOverall": 0,
            },
        ]; // Review data


        // Categories
        const categories: Category[] =
        [
          {
            "id": 1,
            "name": "Black"
          },
          {
            "id": 2,
            "name": "Green"
          },
          {
            "id": 3,
            "name": "White"
          },
          {
            "id": 4,
            "name": "Yellow"
          },
          {
            "id": 5,
            "name": "Oolong"
          },
          {
            "id": 6,
            "name": "Pu-erh"
          },
        ]; // Category data


        // Return
        return { products, reviews, categories };
    }
}
