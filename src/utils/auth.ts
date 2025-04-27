import { User } from "@/models/User";
import {supabase} from "@/lib/supabaseClient";
import {getSession} from "next-auth/react";

export async function signUp(user: User) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
            joinDate: user.joinDate.toISOString(), // Convert Date to string
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(result));
    }

    return result;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }

    if (!user) {
        console.error("User not found");
        return null;
    }

    // Map Supabase user to your custom User model
    const customUser: User = {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        admin: user.admin,
        joinDate: new Date(user.join_date),
        id: user.id,
    };

    return customUser;
}

export async function getUserByUserId(userId: string): Promise<User | null> {
    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }

    if (!user) {
        console.error("User not found");
        return null;
    }

    // Map Supabase user to your custom User model
    const customUser: User = {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        admin: user.admin,
        joinDate: new Date(user.join_date),
    };

    return customUser;
}

export async function getSignedInUser(): Promise<User | null> {
    const session = await getSession();

    if (!session || !session.user) {
        console.error("No active session found");
        return null;
    }

    const user = getUserByEmail(session?.user?.email || "");

    if (!user) {
        console.error("User not found");
        return null;
    }

    return user;
}

export async function didUserWriteReview(reviewId: number): Promise<boolean> {
    if (!reviewId || typeof reviewId !== "number" || isNaN(reviewId)) {
        console.error("Invalid reviewId provided:", reviewId);
        return false;
    }

    const session = await getSession();

    if (!session || !session.user) {
        console.log("No active session found");
        return false;
    }

    const user = await getUserByEmail(session.user.email || "");
    if (!user) {
        console.error("User not found");
        return false;
    }

    const { data: review, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("id", reviewId)
        .eq("user_id", user.id)
        .single();

    if (error) {
        console.error("Error checking review ownership:", error.message);
        return false;
    }

    return !!review;
}

export async function updateUserAdminStatus(email: string, admin: boolean) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/users/admin`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            admin,
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(result));
    }

    return result;
}