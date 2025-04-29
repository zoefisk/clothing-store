import { Carousel } from '@mantine/carousel';
import {Product} from "@/models/Product";
import ProductCard from "@/components/products/ProductCard";

export default function ViewMoreProductsCarousel({ products, orientation = "horizontal" }: { products: Product[]; orientation?: "horizontal" | "vertical" }) {
    return (
        <Carousel
            slideSize="auto"
            height={860} // taller height so you can see multiple cards
            slideGap="md"
            loop
            dragFree
            withIndicators
            orientation={orientation}
            align="start"
            styles={{
                viewport: {
                    padding: "1rem", // optional spacing inside the carousel
                },
            }}
        >
            {products.map((product) => (
                <Carousel.Slide
                    key={product.id}
                    style={{
                        display: "flex",
                        justifyContent: "center", // center the card in slide
                        width: "100%", // force it to match content width
                    }}
                >
                    <div style={{ maxWidth: 350, width: "100%" }}>
                        <ProductCard product={product} useCarousel={false} />
                    </div>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}