import { useState } from "react";
import { Product } from "@/models/Product";
import P from "@/components/typography/P";
import { Grid, Pagination } from "@mantine/core";
import ProductCard from "@/components/products/ProductCard";

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const [activePage, setPage] = useState(1);
  const productsPerPage = 20;
  const paginatedProducts = chunk(products, productsPerPage);

  if (products.length === 0) {
    return <P>No products match the given search query.</P>;
  }

  return (
    <>
      <Grid>
        {paginatedProducts[activePage - 1].map((product) => (
          <Grid.Col key={product.id} span={2.7}>
            <ProductCard product={product} />
          </Grid.Col>
        ))}
      </Grid>
      <Pagination
        total={paginatedProducts.length}
        value={activePage}
        onChange={setPage}
        mt="lg"
      />
    </>
  );
}