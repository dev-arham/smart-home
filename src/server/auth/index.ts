"use server";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";

export const getCurrentSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session ?? null;
}

export const signIn = async ({ email, password }) => {
    await auth.api.signInEmail({
        body: {
            email: email,
            password: password,
        }
    })
}

export const signUp = async ({ email, password, name }) => {
    await auth.api.signUpEmail({
        body: {
            email: email,
            password: password,
            name: name,
        }
    })
}

export const signOut = async () => {
    await auth.api.signOut({
        headers: await headers()
    })
}