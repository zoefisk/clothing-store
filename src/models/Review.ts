/**
 * Review model
 */
export class Review {
    id?: number;
    userId: number;
    productId: number;
    content: string;
    createdAt: Date;
    rating: number;

    constructor(
        userId: number,
        productId: number,
        content: string,
        createdAt: Date,
        rating: number,
        id?: number
    ) {
        this.userId = userId;
        this.productId = productId;
        this.content = content;
        this.createdAt = createdAt;
        this.rating = rating;
        this.id = id;
    }
}

// TODO: if user no longer exists, delete the review