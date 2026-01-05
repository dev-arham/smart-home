"use server";
import { auth } from "@/lib/auth"

export const signIn = async () => {
    await auth.api.signInEmail({
        body: {
            email: "arham@google.com",
            password: "abcd1234",
        }
    })
}

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "arham@google.com",
            password: "abcd1234",
            name: "Arham",
        }
    })
}