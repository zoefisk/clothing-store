import { useSearchParams } from "next/navigation";
import {SegmentedControl} from "@mantine/core";

export default function SizeSelector({ sizes, onSizeChange }: { sizes: string[], onSizeChange: (size: string) => void }) {
    const searchParams = useSearchParams();
    const selectedColor = searchParams.get("size") || sizes[0];

    return (
        <SegmentedControl
            value={selectedColor}
            onChange={onSizeChange}
            data={sizes.map((size) => ({ label: size, value: size }))}
        />
    );
}