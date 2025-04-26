/**
 * api.ts
 * <br>
 * This file contains functions to interact with the API for fetching and creating products.
 * </br>
 */

import {Product} from "@/models/Product";

/**
 * fetchProducts
 * <br>
 * This function fetches the list of products from the API.
 * </br>
 */
export async function fetchProducts() {
    const response = await fetch('/api/products', { method: 'GET' });
    if (!response.ok) {
        throw new Error('Failed to fetch products');
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
export async function fetchStockLevelByProductId(productId: number) {
    const response = await fetch(`/api/stock-levels?productId=${encodeURIComponent(productId)}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Failed to fetch product stock');
    }

    const data = await response.json(); // Await the JSON response
    return data; // Return the resolved data
}

export async function fetchImageByStockLevelId(stockLevelId: number) {
    const response = await fetch(`/api/product-images?stockLevelId=${encodeURIComponent(stockLevelId)}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Failed to fetch product image');
    }

    const data = await response.json(); // Await the JSON response
    return data; // Return the resolved data
}

export async function fetchImagesByProductId(productId: number) {
    const response = await fetch(`/api/product-images?productId=${encodeURIComponent(productId)}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Failed to fetch product images');
    }

    const data = await response.json(); // Await the JSON response
    return data; // Return the resolved data
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