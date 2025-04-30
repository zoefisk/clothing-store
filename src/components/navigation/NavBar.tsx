"use client";

import { useEffect, useState } from "react";
import CategoriesMenu from "./CategoriesMenu";
import NavButton from "@/components/navigation/NavButton";
import { getSignedInUser } from "@/utils/auth";
import P from "@/components/typography/P";
import {signIn} from "next-auth/react";
import SearchBar from "@/components/navigation/SearchBar";
import NavAccountMenu from "@/components/navigation/NavAccountMenu";
import ViewCartButton from "@/components/navigation/ViewCartButton";
import {IconLogin2} from "@tabler/icons-react";

export default function NavBar() {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const signedInUser = await getSignedInUser();
            if (signedInUser) {
                setUser(`${signedInUser.firstName} ${signedInUser.lastName}`);
            } else {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const handleGoogleSignUp = () => {
        signIn("google", { redirect: true, callbackUrl: "/" });
    };

    const handleAccountButton = () => {
        console.log("NavButton pressed!");
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-white text-lg font-bold">Clothing For You!</a>
                <ul className="flex space-x-4">
                    <SearchBar/>
                    <CategoriesMenu />
                    <ViewCartButton/>
                    {user ? (
                        <NavAccountMenu username={user?.split(" ")[0]}/>
                    ) : (
                        <NavButton onButtonPressed={handleGoogleSignUp}>
                            Sign In with Google
                            <IconLogin2 size={20} strokeWidth={2.5} style={{ color: "#ffffff", marginLeft: 8 }} />
                        </NavButton>
                    )}
                </ul>
            </div>
        </nav>
    );
}