"use client";

import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct } from '@/utils/api';
import { Product } from '@/models/Product';

const TestingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');1
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <br />
            colors: {product.colors.join(', ')}
            <br />
            sizes: {product.sizes.join(', ')}
          </li>
        ))}
      </ul>

        <button onClick={() => createProduct(new Product("Test Product", ["red", "blue"], ["S", "M"], 19.99))}>
            Add Test Product
        </button>
    </div>
  );
};

export default TestingPage;