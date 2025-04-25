import {Button} from "@mantine/core";
import {forwardRef} from "react";

const NavButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ children, ...props }, ref) => {
        return (
            <Button variant={"subtle"} styles={{ root: { backgroundColor: 'transparent', color: 'white' } }} ref={ref} {...props}>
                {children}
            </Button>
        );
    }
);

export default NavButton;