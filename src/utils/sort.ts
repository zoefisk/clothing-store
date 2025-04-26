import {Product} from "@/models/Product";
import {sortingTypes} from "@/lib/constants";

export const sortProducts = (sortingType: string, products: Product[]): Product[] => {
    switch (sortingType) {
        case sortingTypes.PRICE_LOW_TO_HIGH:
            return products.sort((a, b) => a.price - b.price);
        case sortingTypes.PRICE_HIGH_TO_LOW:
            return products.sort((a, b) => b.price - a.price);
        // case sortingTypes.NEWEST_ARRIVALS:
        //     return products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        // case sortingTypes.MOST_POPULAR:
        //     return products.sort((a, b) => b.popularity - a.popularity);
    }

    return products; // Default case, return the original array if no sorting type matches
}