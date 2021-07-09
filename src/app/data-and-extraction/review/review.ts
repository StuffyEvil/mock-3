/*
 * Interface for Reviews
 * Keeping this separate from Products to make it easier to manage them.
 * Reviews around found by looking for the product attached.
 * Also can update the rating of the product accordingly?
 * Possibly have other stuff like user ranking for helpful or something.
 */


/*
 * Interface for Reviews, which holds a bunch of reviews for a single product
 * of the same id.
 */
export interface Reviews
{
    // Hold the id for the product in question.
    id: number;

    // Array to hold the individual Review(s).
    reviews: Review[];

    // Overall rating of the product, reflect rating in Product.
    ratingOverall: number;
}


// Interface for a single Review, which is contained in Reviews.
export interface Review
{
    // Hold the id for the product in question.
    id: number;

    // String to hold the actual review.
    review: string;

    // Rating of this specific review.
    rating: number;

    // Helpful, amount of helpful this review has.
    // helpful: number;
}
