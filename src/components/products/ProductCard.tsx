"use client";

import { StockLevel } from "@/models/StockLevel";
import { Badge, Button, Text, Card, Group, Image, Box, Skeleton } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";
import { fetchImagesByProductId, fetchStockLevelsByProductId } from "@/utils/api";
import { ProductImage } from "@/models/ProductImage";
import P from "@/components/typography/P";
import Link from "next/link";

export default function ProductCard({ product, useCarousel = true }: { product: Product; useCarousel?: boolean }) {
    const [stockLevels, setStockLevels] = useState<StockLevel[]>([]);
    const [images, setImages] = useState<ProductImage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (product.id !== undefined) {
            setLoading(true); // Start loading
            Promise.all([
                fetchStockLevelsByProductId(product.id).then((data) => setStockLevels(data)),
                fetchImagesByProductId(product.id).then((data) => setImages(data)),
            ])
                .catch((error) => console.error("Error fetching data:", error))
                .finally(() => setLoading(false)); // Stop loading
        } else {
            console.error("Product ID is undefined");
        }
    }, []);

    let imageArea = <></>;

    if (images.length === 0) {
        imageArea = (
            <div style={{ height: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <P>No images available for this product.</P>
            </div>
        );
    } else if (images.length === 1) {
        imageArea = <Image src={images[0].url} alt={images[0].altText} height={200} fit="cover" />;
    } else if (images.length > 1) {
        if (useCarousel) {
            imageArea = (
                <Carousel orientation="horizontal" height={350} withIndicators loop>
                    {images.map((image, index) => (
                        <Carousel.Slide key={`${image.url}-${index}`} style={{ display: "flex", justifyContent: "center" }}>
                            <Image src={image.url} alt={image.altText} height={300} fit="cover" />
                        </Carousel.Slide>
                    ))}
                </Carousel>
            );
        } else {
            imageArea = <Image src={images[0].url} alt={images[0].altText} height={200} fit="cover" />;
        }
    }

    return (
        <Skeleton visible={loading} radius="md" height={410}>
            <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ transition: "transform 0.2s", cursor: "pointer", width: 350, height: 410 }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    <Card.Section>{imageArea}</Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500} lineClamp={1}>{product.name}</Text>
                        <Badge color="pink" size="lg">${product.price}</Badge>
                    </Group>
                </Card>
            </Link>
        </Skeleton>
    );
}

// TODO: (not the right spot to do this but i dont want to forget). When creating stock levels, need to ensure that there cant be colors or sizes that are not part of the original product.
