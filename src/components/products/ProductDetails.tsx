import { Text, Badge, Button, Grid } from "@mantine/core";
import { Product } from "@/models/Product";
import ColorSelector from "@/components/products/ColorSelector";
import SizeSelector from "@/components/products/SizeSelector";
import { useSearchParams, useRouter } from "next/navigation";

interface ProductDetailsProps {
    product: Product;
}

const sizes = ['Small', 'Medium', 'Large'];
const colors = ['Red', 'Blue', 'Green'];

export default function ProductDetails({ product }: ProductDetailsProps) {

    const searchParams = useSearchParams();
    const router = useRouter();

    const handleColorChange = (color: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("color", color.toLowerCase());
        router.push(`?${params.toString()}`);
    };

    const handleSizeChange = (size: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("size", size.toLowerCase().replace(/\s+/g, '-'));
        router.push(`?${params.toString()}`);
    };

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

            <div style={{marginBottom: '1rem', marginTop: '1rem'}}>
                <Text fw={500} size="sm" mb="xs">Select Color:</Text>
                <ColorSelector colors={colors} onColorChange={handleColorChange}/>
            </div>
            <div>
                <Text fw={500} size="sm" mb="xs">Select Size:</Text>
                <SizeSelector sizes={sizes} onSizeChange={handleSizeChange}/>
            </div>
        </Grid.Col>
    );
}