import { Carousel } from '@mantine/carousel';
import {Product} from "@/models/Product";
import ProductCard from "@/components/products/ProductCard";

export default function ViewMoreProductsCarousel({ products }: { products: Product[] }) {
    return (
        <Carousel slideSize="20%" height={450} slideGap="md" loop dragFree withIndicators>
            {products.map((product) => (
                <Carousel.Slide key={product.id}>
                    <ProductCard product={product} useCarousel={false}/>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}