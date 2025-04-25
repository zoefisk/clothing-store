/**
 * api.ts
 * <br>
 * This file contains functions to interact with the API for fetching and creating products.
 * </br>
 */

export async function fetchProducts() {
  const response = await fetch('/api/products', { method: 'GET' });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function createProduct(product: Record<string, any>) {
    const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return response.json();
}