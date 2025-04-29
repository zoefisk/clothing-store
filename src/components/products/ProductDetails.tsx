import { Text, Badge, Button, Grid } from "@mantine/core";
import { Product } from "@/models/Product";
import ColorSelector from "@/components/products/ColorSelector";
import SizeSelector from "@/components/products/SizeSelector";
import { useSearchParams, useRouter } from "next/navigation";
import {convertLowerCaseToFirstUpperCase, convertSizesToLongForm} from "@/utils/conversions";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const searchParams = useSearchParams();
    const router = useRouter();

    const handleAttributeChange = (attribute: "color" | "size", value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(attribute, value.toLowerCase().replace(/\s+/g, '-'));
        setTimeout(() => {
            router.push(`?${params.toString()}`);
        }, 0);
    };

    const longformSizes = convertSizesToLongForm(product.sizes);
    const upperCaseColors = convertLowerCaseToFirstUpperCase(product.colors);

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
                <ColorSelector colors={upperCaseColors} onColorChange={(color) => handleAttributeChange("color", color)} />
            </div>
            <div>
                <Text fw={500} size="sm" mb="xs">Select Size:</Text>
                <SizeSelector sizes={longformSizes} onSizeChange={(size) => handleAttributeChange("size", size)} />
            </div>
        </Grid.Col>
    );
}