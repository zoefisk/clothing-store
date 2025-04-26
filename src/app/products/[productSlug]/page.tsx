"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Product } from "@/models/Product";
import { fetchImagesByProductId, fetchProductBySlug } from "@/utils/api";
import { Skeleton, Text, Image, Badge, Button, Container, Breadcrumbs, Anchor, Grid, Textarea, Title } from "@mantine/core";
import P from "@/components/typography/P";
import { ProductImage } from "@/models/ProductImage";
import ProductDetails from "@/components/products/ProductDetails";

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
            <Grid>
                {/* Left Column: Image */}
                <Grid.Col span={6}>
                    <Image src={images[0]?.url} alt={product.name} height={300} fit="cover" />
                </Grid.Col>
                <ProductDetails product={product} />
            </Grid>

            {/* Reviews and Comments Section */}
            <Title order={3} mt="xl" mb="md">Reviews and Comments</Title>
            <Textarea
                placeholder="Write your review here..."
                label="Leave a comment"
                autosize
                minRows={3}
                mb="md"
            />
            <P>No reviews yet. Be the first to leave a comment!</P>

            {/* Similar Items Section */}
            <Title order={3} mt="xl" mb="md">View More Like This</Title>
            {/*{similarProducts.length > 0 ? (*/}
            {/*    <ProductGrid products={similarProducts} />*/}
            {/*) : (*/}
            {/*    <P>No similar items found.</P>*/}
            {/*)}*/}
        </Container>
    );
}