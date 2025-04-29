import { useState } from "react";
import { Product } from "@/models/Product";
import P from "@/components/typography/P";
import { Grid, Pagination } from "@mantine/core";
import ProductCard from "@/components/products/ProductCard";
import { filterProductsBySearch } from "@/utils/filter";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [activePage, setPage] = useState(1);
  const productsPerPage = 20;

  // Check for search query in the URL
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get("search") || "";

  // Filter products if search query exists
  const filteredProducts = searchQuery
      ? filterProductsBySearch(products, searchQuery)
      : products;

  // Paginate products
  const startIndex = (activePage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  if (filteredProducts.length === 0) {
    return <P>No products match the given search query.</P>;
  }

  return (
      <>
          <Grid gutter="1rem">
          {paginatedProducts.map((product) => (
              <Grid.Col key={product.id} span="content">
                <ProductCard product={product} />
              </Grid.Col>
          ))}
        </Grid>
        <Pagination
            total={Math.ceil(filteredProducts.length / productsPerPage)}
            value={activePage}
            onChange={setPage}
            mt="lg"
        />
      </>
  );
}