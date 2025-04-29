import { Button } from "@mantine/core";
import NavButton from "@/components/navigation/NavButton";
import { IconShoppingCart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ViewCartButton() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/my-cart");
    };

    return (
        <NavButton onButtonPressed={handleRedirect}>
            My Cart
            <IconShoppingCart size={18} style={{ marginRight: 8, marginLeft: 5 }} />
        </NavButton>
    );
}