import { User } from "@/models/User";

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