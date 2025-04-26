import {StockLevel} from "@/models/StockLevel";

"ues client";

import {Badge, Button, Text, Card, Group, Image} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {Product} from "@/models/Product";
import {useEffect, useState} from "react";
import {fetchImagesByProductId, fetchStockLevelByProductId} from "@/utils/api";
import {ProductImage} from "@/models/Image";

/**
 * ProductCard
 * <br>
 * This component displays a product card with an image carousel, product name, description, and a button.
 * </br>
 * @param product The product object containing product details.
 */
export default function ProductCard({ product }: { product: Product }) {

    const [stockLevels, setStockLevels] = useState<StockLevel[]>([]);
    const [images, setImages] = useState<ProductImage[]>([]);

    useEffect(() => {
        if (product.id !== undefined) {
            fetchStockLevelByProductId(product.id).then((data) => setStockLevels(data));
            fetchImagesByProductId(product.id).then((data) => setImages(data));
        }
        else {
            console.error("Product ID is undefined");
        }
    }, []);

    console.log("images: ", images);
    console.log("stockLevels: ", stockLevels);

    return (
        <Card shadow="sm"
              padding="lg"
              radius="md"
              withBorder>
            <Card.Section>
                <Carousel orientation="horizontal" height={200} withIndicators>
                    {images.map((image, index) => (
                        <Carousel.Slide key={`${image.url}-${index}`}>
                            <Image src={image.url} alt={image.alt_text} height={200} fit="cover" />
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Norway Fjord Adventures</Text>
                <Badge color="pink">On Sale</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
            </Button>
        </Card>
    )
}


// TODO: (not the right spot to do this but i dont want to forget). When creating stock levels, need to ensure that there cant be colors or sizes that are not part of the original product.
