import { SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";
import {useSearchParams} from "next/navigation";

export default function SizeSelector({ sizes, onSizeChange }: { sizes: string[], onSizeChange: (size: string) => void }) {
    const searchParams = useSearchParams();
    const initialSize = searchParams.get("size") || sizes[0];
    const [selectedSize, setSelectedSize] = useState(initialSize);

    useEffect(() => {
        if (!searchParams.get("size")) {
            onSizeChange(initialSize); // Ensure the default is sent to the URL
        }
    }, [initialSize, onSizeChange, searchParams]);

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
        onSizeChange(size);
    };

    return (
        <SegmentedControl
            value={selectedSize}
            onChange={handleSizeChange}
            data={sizes.map((size) => ({ label: size, value: size }))}
        />
    );
}