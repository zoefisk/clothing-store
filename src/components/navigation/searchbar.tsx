import { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";

export default function SearchBar({ showIcon = true }: { showIcon?: boolean }) {
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
        <div style={{ display: "flex", alignItems: "center" }}>
            {showIcon && (
                <IconSearch size={20} strokeWidth={2.5} style={{ color: "#ffffff", marginRight: 8 }} />
            )}
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
        </div>
    );
}