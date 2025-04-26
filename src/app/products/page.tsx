// TODO: add category data to URL
// TODO: add Pagination from Mantine

"use client";

import { useEffect, useState } from "react";
import {Product} from "@/models/Product";
import {fetchProducts} from "@/utils/api";
import ProductGrid from "@/components/products/ProductGrid";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then((data) => setProducts(data));
    }, []);

    return <ProductGrid products={products} />;
}