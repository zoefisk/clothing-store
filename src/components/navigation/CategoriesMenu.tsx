"use client";

import {Button, Grid, Menu} from '@mantine/core';
import '@mantine/core/styles.css';
import NavButton from "@/components/navigation/NavButton";
import H3 from "@/components/typography/H3";
import {clothingTypes, clothingColors, clothingSizesShorthand, clothingSizes, clothingStyles} from "@/lib/constants";
import {IconCategory} from "@tabler/icons-react";

export default function CategoriesMenu() {

    return (
        <>
            <Menu trigger="hover" openDelay={100} closeDelay={400}>
                <Menu.Target>
                    <NavButton>
                        Categories
                        <IconCategory size={18} style={{ marginRight: 8, marginLeft: 5 }} />
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
        </>
    );
}