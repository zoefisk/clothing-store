import {Grid, Menu} from "@mantine/core";
import NavButton from "@/components/navigation/NavButton";
import H3 from "@/components/typography/H3";
import {clothingSizes, clothingStyles, clothingTypes} from "@/lib/constants";

export default function NavAccountMenu({ username }: { username: string }) {

    return (
        <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
                <NavButton>
                    Hi, {username}!
                </NavButton>
            </Menu.Target>

            <Menu.Dropdown>
                {/*<Menu.Item>Option 1</Menu.Item>*/}
                {/*<Menu.Item>Option 2</Menu.Item>*/}
                {/*<Menu.Item>Option 3</Menu.Item>*/}

                <Grid gutter={"xl"}>
                    <Grid.Col span={4}>
                        <H3>Types</H3>
                        {clothingTypes.map((type) => (
                            <p key={type}>{type}</p>
                        ))}
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <H3>Styles</H3>
                        {clothingStyles.map((style) => (
                            <p key={style}>{style}</p>
                        ))}
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <H3>Sizes</H3>
                        {clothingSizes.map((size) => (
                            <p key={size}>{size}</p>
                        ))}
                    </Grid.Col>
                </Grid>


            </Menu.Dropdown>
        </Menu>
    )
}