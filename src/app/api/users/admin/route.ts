import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { email, admin } = body;

        if (!email || typeof admin !== "boolean") {
            return NextResponse.json({ error: "Email and admin (boolean) are required" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("users")
            .update({ admin })
            .eq("email", email)
            .select();

        if (error) {
            console.error("Supabase update error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data || data.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Admin status updated", user: data[0] }, { status: 200 });
    } catch (err: any) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}
