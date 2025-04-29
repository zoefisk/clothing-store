import { useSearchParams } from "next/navigation";
import {SegmentedControl} from "@mantine/core";
import {useEffect, useState} from "react";

export default function ColorSelector({ colors, onColorChange }: { colors: string[], onColorChange: (color: string) => void }) {
    const searchParams = useSearchParams();
    const initialColor = searchParams.get("color") || colors[0];
    const [selectedColor, setSelectedColor] = useState(initialColor);

    useEffect(() => {
        if (!searchParams.get("color")) {
            onColorChange(initialColor); // Ensure the default is sent to the URL
        }
    }, [initialColor, onColorChange, searchParams]);

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        onColorChange(color);
    };

    return (
        <SegmentedControl
            value={selectedColor}
            onChange={handleColorChange}
            data={colors.map((color) => ({ label: color, value: color }))}
        />
    );
}