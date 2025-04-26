// File: src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User as NextAuthUser } from "next-auth";
import { signUp } from "@/utils/auth";
import { User } from "@/models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
    ],
    debug: true,
    callbacks: {
        async signIn({ user }: { user: NextAuthUser }) {
            const { email, name } = user;

            if (!email || !name) {
                console.error("Missing email or name from Google profile");
                return false;
            }

            // Try to split name into first and last
            const [firstName, ...lastParts] = name.split(" ");
            const lastName = lastParts.join(" ") || "(No Last Name)";

            const newUser = new User(
                firstName,
                lastName,
                email,
                false,              // admin
                new Date()          // joinDate
            );

            try {
                await signUp(newUser);
                return true;
            } catch (error) {
                console.error("Error during sign-up:", error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
