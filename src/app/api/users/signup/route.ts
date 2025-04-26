// File: src/app/api/users/signup/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, firstName, lastName, admin = false, joinDate = new Date().toISOString() } = body;

        if (!email || !firstName || !lastName) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // 🔍 Check if user with this email already exists
        const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .single();

        if (fetchError && fetchError.code !== "PGRST116") {
            // Supabase returns PGRST116 when no rows are found, which is expected
            console.error("Supabase fetch error:", fetchError);
            return NextResponse.json({ error: "Error checking for existing user" }, { status: 500 });
        }

        if (existingUser) {
            return NextResponse.json({ message: "User already exists", user: existingUser }, { status: 200 });
        }

        // ✍️ Insert new user
        const { data, error } = await supabase
            .from("users")
            .insert([{ email, first_name: firstName, last_name: lastName, admin, join_date: joinDate }])
            .select(); // Return the new user data

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: "User created successfully", user: data?.[0] }, { status: 201 });
    } catch (err: any) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}

