import { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";

export default function SearchBar() {
    const [initialQuery, setInitialQuery] = useState("");

    useEffect(() => {
        // Access `window` only on the client side
        const searchParams = new URLSearchParams(window.location.search);
        setInitialQuery(searchParams.get("search") || "");
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value.trim();
        if (event.key === "Enter") {
            if (query.length > 1 || initialQuery !== "") {
                window.location.href = `/products?search=${encodeURIComponent(query)}`;
            }
        }
    };

    return (
        <TextInput
            placeholder="Search for a product..."
            size="sm"
            defaultValue={initialQuery}
            onKeyDown={handleKeyDown}
            styles={{
                input: {
                    backgroundColor: "#ffffff",
                    fontSize: "1rem",
                    borderRadius: "4px",
                },
            }}
        />
    );
}