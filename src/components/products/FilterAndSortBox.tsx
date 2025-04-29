import {Container, Paper, Select} from "@mantine/core";

export default function FilterAndSortBox({ onFilterChange, onSortChange }: { onFilterChange: (filter: string) => void; onSortChange: (sort: string) => void }) {
    const handleFilterChange = (value: string | null) => {
        if (value !== null) {
            onFilterChange(value);
        }
    };

    const handleSortChange = (value: string | null) => {
        if (value !== null) {
            onSortChange(value);
        }
    };

    return (
        <Container style={{ borderRadius: "4px" }} className="bg-gray-800 p-4">
            <Select
                onChange={(value) => handleFilterChange(value)}
                className="mr-4 p-2"
                label="Your favorite library"
                placeholder="Pick value"
                data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <Select
                onChange={(value) => handleSortChange(value)}
                className="mr-4 p-2"
                label="Your favorite library"
                placeholder="Pick value"
                data={['React', 'Angular', 'Vue', 'Svelte']}
            />
        </Container>
    );
}