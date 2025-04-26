import {Product} from "@/models/Product";
import P from "@/components/typography/P";
import {Grid} from "@mantine/core";
import ProductCard from "@/components/products/ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {

    if (products.length === 0) {
        return <P>No products match the given search query.</P>;
    }

    return (
        <Grid>
            {products.map((product) => (
                <Grid.Col key={product.id} span={2.7}>
                    <ProductCard product={product} />
                </Grid.Col>
            ))}
        </Grid>
    )
}