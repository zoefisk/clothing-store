"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Product } from "@/models/Product";
import { fetchImagesByProductId, fetchProductBySlug } from "@/utils/api";
import { Skeleton, Text, Image, Badge, Button, Container, Breadcrumbs, Anchor } from "@mantine/core";
import P from "@/components/typography/P";
import { ProductImage } from "@/models/ProductImage";

export default function ProductDetailsPage() {
    const { productSlug } = useParams() as { productSlug: string };
    if (!productSlug) notFound();

    const [product, setProduct] = useState<Product | null>(null);
    const [images, setImages] = useState<ProductImage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const product = await fetchProductBySlug(productSlug);
                setProduct(product);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productSlug]);

    useEffect(() => {
        const fetchImages = async () => {
            if (product) {
                try {
                    if (product.id !== undefined) {
                        const images = await fetchImagesByProductId(product.id);
                        setImages(images);
                    } else {
                        console.error("Product ID is undefined");
                    }
                } catch (error) {
                    console.error("Error fetching product images:", error);
                }
            }
        };

        fetchImages();
    }, [product]);

    if (loading) {
        return <Skeleton visible={true} height={400} />;
    }

    if (!product) {
        notFound();
    }

    const breadcrumbItems = [
        { title: "Home", href: "/" },
        { title: "Products", href: "/products" },
        { title: product.name, href: `/products/${product.slug}` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container>
            <Breadcrumbs separator="→" mt="md" mb="lg">
                {breadcrumbItems}
            </Breadcrumbs>
            <Image src={images[0]?.url} alt={product.name} height={300} fit="cover" />
            <Text fw={700} size="xl" mt="md">{product.name}</Text>
            <Badge color="pink" size="lg" mt="sm">${product.price}</Badge>
            <Button color="blue" fullWidth mt="lg" radius="md">
                Add to Cart
            </Button>
        </Container>
    );
}