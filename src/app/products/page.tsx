// TODO: add category data to URL
// TODO: add Pagination from Mantine

"use client";

import { useEffect, useState } from "react";
import {Product} from "@/models/Product";
import {fetchProducts} from "@/utils/api";
import ProductGrid from "@/components/products/ProductGrid";
import {sortingTypes} from "@/lib/constants";
import {sortProducts} from "@/utils/sort";
import SearchBar from "@/components/navigation/SearchBar";
import P from "@/components/typography/P";
import FilterAndSortBox from "@/components/products/FilterAndSortBox";
import {Grid} from "@mantine/core";
import {filterProductsByCategories} from "@/utils/filter";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAndSortProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSortProducts();
    }, []);

    const handleFilterChange = (filter: string) => {
        if (loading) return;

        if (filter !== "") {
            const filteredProducts = filterProductsByCategories(products, filter);
            setProducts(filteredProducts);
        }
    };

    const handleSortChange = (sort: string) => {
        // TODO: Implement sorting logic
        console.log("Sort changed to:", sort);
    };

    return (
        <Grid>
            <Grid.Col span={3}>
                <FilterAndSortBox onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
            </Grid.Col>
            <Grid.Col span={9}>
                <SearchBar />
                <div style={{ marginTop: "20px" }}>
                    <ProductGrid products={products} />
                </div>
            </Grid.Col>
        </Grid>
    );
}