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

        const { data, error } = await supabase
            .from("users")
            .insert([{ email, first_name: firstName, last_name: lastName, admin, join_date: joinDate }]);

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: "User created successfully", user: data }, { status: 201 });
    } catch (err: any) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}

