import {Product} from "@/models/Product";

export const filterProductsByCategories = (products: Product[], filter: string[]) => {
    if (!filter) return products;
}

export const filterProductsBySearch = (products: Product[], search: string) => {
    if (!search) return products;
    const searchLower = search.toLowerCase();
    return products.filter(product => {
        return product.name.toLowerCase().includes(searchLower);
    });
}

export const filterProductsByCategory = (products: Product[], categories: string[]) => {
    if (!categories) return products;
    return products.filter(product => {
        return product.category && categories.some(category => product.category.includes(category));
    });
}