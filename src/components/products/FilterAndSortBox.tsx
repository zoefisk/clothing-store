import {Container, MultiSelect, Select} from "@mantine/core";
import {clothingStyles, clothingTypes} from "@/lib/constants";

export default function FilterAndSortBox({ onFilterChange, onSortChange }: { onFilterChange: (filters: string[]) => void; onSortChange: (sort: string) => void }) {
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const initialFilters = searchParams.get("filters")?.split(",").filter(Boolean) || [];
    const initialSort = searchParams.get("sort") || null;

    const handleFilterChange = (value: string[] | null) => {
        const params = new URLSearchParams(window.location.search);
        if (value && value.length > 0) {
            params.set("filters", value.join(","));
        } else {
            params.delete("filters");
        }
        window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
        onFilterChange(value || []);
    };

    const handleSortChange = (value: string | null) => {
        if (value !== null) {
            onSortChange(value);
        }
    };

    return (
        <Container style={{ borderRadius: "6px", color: "white", minHeight: "850px"}} className="bg-gray-800 p-4">
            <MultiSelect
                onChange={(value) => handleFilterChange(value)}
                className="mr-4 p-2"
                label="Filter products"
                placeholder="Filter products by..."
                data={[...clothingTypes, ...clothingStyles]}
                value={initialFilters}
            />
            <Select
                onChange={(value) => handleSortChange(value)}
                className="mr-4 p-2"
                label="Sort products"
                placeholder="Sort products by..."
                data={["Price: Low to High", "Price: High to Low", "Newest Arrivals", "Most Popular"]}
                value={initialSort}
            />
        </Container>
    );
}