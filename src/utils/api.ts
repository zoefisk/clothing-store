/**
 * api.ts
 * <br>
 * This file contains functions to interact with the API for fetching and creating products.
 * </br>
 */

import {Product} from "@/models/Product";
import {Review} from "@/models/Review";

/**
 * fetchProducts
 * <br>
 * This function fetches the list of products from the API.
 * </br>
 */
export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('/api/products', { method: 'GET' });
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json(); // Await the JSON response
    return data; // Return the resolved data
}

/**
 * fetchProductBySlug
 * <br>
 * This function fetches a product by its slug from the API.
 * </br>
 * @param productSlug The slug of the product to fetch.
 */
export async function fetchProductBySlug(productSlug: string): Promise<Product | null> {
    const response = await fetch(`/api/products?slug=${encodeURIComponent(productSlug)}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    const data = await response.json(); // Await the JSON response
    return data; // Return the resolved data
}

/**
 * fetchStockLevelByProductId
 * <br>
 * This function fetches the stock level of a product by its ID.
 * </br>
 * @param productId The ID of the product for which to fetch the stock level.
 */
export async function fetchStockLevelsByProductId(productId: number) {
    const response = await fetch(`/api/stock-levels?productId=${encodeURIComponent(productId)}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Failed to fetch product stock');
    }

    const data = await response.json(); // Await the JSON response
    return data; // Return the resolved data
}

export async function fetchImagesByStockLevelId(stockLevelId: number) {
    const response = await fetch(`/api/product-images?stockLevelId=${encodeURIComponent(stockLevelId)}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Failed to fetch product image');
    }

    const data = await response.json(); // Await the JSON response
    return data; // Return the resolved data
}

export async function fetchImageByImageId(imageId: number) {
    const response = await fetch(`/api/product-images?imageId=${encodeURIComponent(imageId)}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Failed to fetch product image');
    }

    const data = await response.json(); // Await the JSON response

    return {
        stockLevelId: data.stock_level_id,
        productId: data.product_id,
        fileName: data.file_name,
        url: data.url,
        altText: data.alt_text,
        id: data.id,
    }; // Return the transformed object
}

export async function fetchImagesByProductId(productId: number) {
    const response = await fetch(`/api/product-images?productId=${encodeURIComponent(productId)}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Failed to fetch product images');
    }

    const data = await response.json(); // Await the JSON response
    return data; // Return the resolved data
}

export async function fetchReviewsByProductId(productId: number): Promise<Review[]> {
    const response = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Failed to fetch product reviews');
    }

    const data = await response.json(); // Await the JSON response

    // Transform the keys from snake_case to camelCase
    // TODO: do this for the rest of the API
    const reviews = data.map((review: any) => ({
        id: review.id,
        productId: review.product_id,
        userId: review.user_id,
        rating: review.rating,
        content: review.content,
        createdAt: review.created_at,
        updatedAt: review.updated_at,
    }));

    return reviews; // Return the transformed data
}

/**
 * createProduct
 * @param product The product object to be created.
 */
export async function createProduct(product: Omit<Product, 'id'>) {

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: product.name,
            colors: product.colors,
            sizes: product.sizes,
            price: product.price,
            category: product.category,
        }),
    });
    if (!response.ok) {
        const errorDetails = await response.text(); // Log the server's error message
        console.error("Server error details:", errorDetails);
        throw new Error('Failed to create product');
    }
    return response.json();
}