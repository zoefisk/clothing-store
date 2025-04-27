import { useSearchParams } from "next/navigation";
import {SegmentedControl} from "@mantine/core";

export default function ColorSelector({ colors, onColorChange }: { colors: string[], onColorChange: (color: string) => void }) {
    const searchParams = useSearchParams();
    const selectedColor = searchParams.get("color") || colors[0];
    if (!searchParams.get("color")) onColorChange(colors[0]);

    return (
        <SegmentedControl
            value={selectedColor}
            onChange={onColorChange}
            data={colors.map((color) => ({ label: color, value: color }))}
        />
    );
}