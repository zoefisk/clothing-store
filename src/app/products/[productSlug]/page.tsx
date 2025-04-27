"use client";

import { useEffect, useState } from "react";
import {notFound, useParams, useSearchParams} from "next/navigation";
import { Product } from "@/models/Product";
import {
    fetchImagesByProductId,
    fetchProductBySlug,
    fetchProducts,
    fetchReviewsByProductId,
    fetchStockLevelsByProductId
} from "@/utils/api";
import { Skeleton, Text, Image, Badge, Button, Container, Breadcrumbs, Anchor, Grid, Textarea, Title } from "@mantine/core";
import P from "@/components/typography/P";
import { ProductImage } from "@/models/ProductImage";
import ProductDetails from "@/components/products/ProductDetails";
import {getSignedInUser} from "@/utils/auth";
import ReviewList from "@/components/reviews/ReviewList";
import {Review} from "@/models/Review";

import ViewMoreProductsCarousel from "@/components/products/ViewMoreProductsCarousel";
import SizeSelector from "@/components/products/SizeSelector";
import ColorSelector from "@/components/products/ColorSelector";
import {StockLevel} from "@/models/StockLevel";

export default function ProductDetailsPage() {
    const { productSlug } = useParams() as { productSlug: string };
    const searchParams = useSearchParams();
    if (!productSlug) notFound();

    const [product, setProduct] = useState<Product | null>(null);
    const [stockLevels, setStockLevels] = useState<StockLevel[]>([]);
    const [currentQuantity, setCurrentQuantity] = useState<number | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
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
        const urlColor = searchParams.get("color");
        let urlSize = searchParams.get("size");
        switch (urlSize) {
            case "extra-small":
                urlSize = "XS";
                break;
            case "small":
                urlSize = "S";
                break;
            case "medium":
                urlSize = "M";
                break;
            case "large":
                urlSize = "L";
                break;
            case "extra-large":
                urlSize = "XL";
                break;
            case "double-extra-large":
                urlSize = "XXL";
                break;
            default:
                urlSize = null;
        }

        console.log("stock levels: ", stockLevels);

        if (urlColor && urlSize && stockLevels.length > 0) {
            const matchingStock = stockLevels.find(
                (stock) => stock.color === urlColor && stock.size === urlSize
            );
            setCurrentQuantity(matchingStock ? matchingStock.quantity : null);
            console.log("Matching stock:", matchingStock);
            console.log("Current quantity:", currentQuantity);
        } else {
            setCurrentQuantity(null);
        }
    }, [searchParams, stockLevels]);

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            try {
                const products = await fetchProducts();
                const filteredProducts = products.filter((p) => p.slug !== productSlug);    // Exclude the current product
                setSimilarProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching similar products:", error);
            }
        };

        fetchSimilarProducts();
    }, []);

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

            <P>Current quantity: {currentQuantity}</P>

            {/* Reviews and Comments Section */}
            <hr/>
            <ReviewList reviews={reviews}/>

            {/* Similar Items Section */}
            <Title order={3} mt="xl" mb="md">View More Like This</Title>
            {similarProducts.length > 0 ? (
                <ViewMoreProductsCarousel products={similarProducts} />
            ) : (
                <P>No similar items found.</P>
            )}
        </Container>
    );
}