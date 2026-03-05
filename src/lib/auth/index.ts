import { betterAuth, number } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    user: {
        additionalFields: {
            role: {
                type: ["customer", "admin"],
                required: true,
                defaultValue: "customer",
            },
            phone: {
                type: "string",
                required: false
            }
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    plugins: [nextCookies()]
});