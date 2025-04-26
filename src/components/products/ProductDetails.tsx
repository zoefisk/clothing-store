import { Text, Badge, Button, Grid } from "@mantine/core";
import { Product } from "@/models/Product";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <Grid.Col span={6}>
            <Text fw={700} size="xl" mt="md">
                {product.name}
            </Text>
            <Badge color="pink" size="lg" mt="sm">
                ${product.price}
            </Badge>
            <Button color="blue" fullWidth mt="lg" radius="md">
                Add to Cart
            </Button>
        </Grid.Col>
    );
}