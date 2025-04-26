// TODO: add category data to URL
// TODO: add Pagination from Mantine

"use client";

import { useEffect, useState } from "react";
import {Product} from "@/models/Product";
import {fetchProducts} from "@/utils/api";
import ProductGrid from "@/components/products/ProductGrid";
import {sortingTypes} from "@/lib/constants";
import {sortProducts} from "@/utils/sort";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAndSortProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts();
                setProducts(sortProducts(sortingTypes.PRICE_LOW_TO_HIGH, data));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSortProducts();
    }, []);

    return <ProductGrid products={products} />;
}