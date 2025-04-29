"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { Product } from "@/models/Product";
import {
    fetchProductBySlug,
    fetchProducts,
    fetchReviewsByProductId,
    fetchStockLevelsByProductId,
    fetchImageByImageId
} from "@/utils/api";
import { Skeleton, Image, Container, Breadcrumbs, Anchor, Grid, Title } from "@mantine/core";
import P from "@/components/typography/P";
import ProductDetails from "@/components/products/ProductDetails";
import ReviewList from "@/components/reviews/ReviewList";
import ViewMoreProductsCarousel from "@/components/products/ViewMoreProductsCarousel";
import { StockLevel } from "@/models/StockLevel";
import { Review } from "@/models/Review";
import {ProductImage} from "@/models/ProductImage";
import {convertURLSize} from "@/utils/conversions";

export default function ProductDetailsPage() {
    const { productSlug } = useParams() as { productSlug: string };
    const searchParams = useSearchParams();
    if (!productSlug) notFound();

    const [product, setProduct] = useState<Product | null>(null);
    const [stockLevels, setStockLevels] = useState<StockLevel[]>([]);
    const [currentStockLevel, setCurrentStockLevel] = useState<StockLevel | null>(null);
    const [currentImage, setCurrentImage] = useState<ProductImage | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
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
        const fetchStockLevels = async () => {
            if (product) {
                try {
                    if (product.id !== undefined) {
                        const stockLevels = await fetchStockLevelsByProductId(product.id);
                        setStockLevels(stockLevels);
                        console.log("Stock levels:", stockLevels);
                    } else {
                        console.error("Product ID is undefined");
                    }
                } catch (error) {
                    console.error("Error fetching stock levels:", error);
                }
            }
        };

        fetchStockLevels();
    }, [product]);

    useEffect(() => {
        const fetchCurrentStockLevel = async () => {
            const urlColor = searchParams.get("color");
            let urlSize = searchParams.get("size");
            urlSize = convertURLSize(urlSize);

            if (urlColor && urlSize && stockLevels.length > 0) {
                const matchingStock = stockLevels.find(
                    (stock) => stock.color === urlColor && stock.size === urlSize
                );

                if (matchingStock) {
                    setCurrentStockLevel(matchingStock);

                    if (matchingStock.imageId) {
                        try {
                            const image = await fetchImageByImageId(matchingStock.imageId);
                            setCurrentImage(image);
                        } catch (error) {
                            console.error("Error fetching image:", error);
                        }
                    } else {
                        setCurrentImage(null);
                    }
                } else {
                    setCurrentStockLevel(null);
                    setCurrentImage(null);
                }
            } else {
                setCurrentStockLevel(null);
                setCurrentImage(null);
            }
        };

        fetchCurrentStockLevel();
    }, [searchParams, stockLevels]);

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            try {
                const products = await fetchProducts();
                const filteredProducts = products.filter((p) => p.slug !== productSlug);
                setSimilarProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching similar products:", error);
            }
        };

        fetchSimilarProducts();
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            if (product) {
                try {
                    if (product.id !== undefined) {
                        const reviews = await fetchReviewsByProductId(product.id);
                        setReviews(reviews);
                    } else {
                        console.error("Product ID is undefined");
                    }
                } catch (error) {
                    console.error("Error fetching product reviews:", error);
                }
            }
        };

        fetchReviews();
    }, [product]);

    if (loading) return <Skeleton visible={true} height={400} />;
    if (!product) notFound();

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
        <Container style={{ padding: "0", maxWidth: "80%" }}>
            <Breadcrumbs separator="→" mt="md" mb="lg">
                {breadcrumbItems}
            </Breadcrumbs>

            <Grid gutter="50">
                {/* Main Content */}
                <Grid.Col span={8}>
                    <Grid gutter="sm">
                        {/* Left Column: Image */}
                        <Grid.Col span={6}>
                            {currentImage ? (
                                <Image
                                    src={currentImage.url}
                                    alt={currentImage.altText}
                                    height={300}
                                    width={300}
                                    fit="cover"
                                    // style={{ border: "1.5px solid grey" }}
                                />
                            ) : (
                                <Skeleton visible={true} height={300} />
                            )}
                        </Grid.Col>
                        <ProductDetails product={product} />
                    </Grid>

                    <P>
                        {currentStockLevel?.quantity === 0
                            ? "Sorry! This item is currently out of stock with this size and color combination."
                            : (currentStockLevel?.quantity ?? 0) <= 5
                                ? "Low stock! Grab yours before it's gone!"
                                : ``}
                    </P>

                    {/* Reviews and Comments Section */}
                    <ReviewList reviews={reviews} />
                </Grid.Col>

                {/* Right Column: Vertical Carousel */}
                <Grid.Col span={4} style={{ textAlign: "center" }}>
                    <Title order={3} mt="xl" mb="md">View More Like This</Title>
                    <hr/>
                    {similarProducts.length > 0 ? (
                        <ViewMoreProductsCarousel products={similarProducts} orientation={"vertical"} />
                    ) : (
                        <P>No similar items found.</P>
                    )}
                </Grid.Col>
            </Grid>
        </Container>
    );
}