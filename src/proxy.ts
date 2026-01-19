import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/dashboard"];

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(pathName);

    const session = await auth.api.getSession({
        headers: await headers()
    })

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route

    if (!session && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session && (pathName === "/login" || pathName === "/signup")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/login", "/signup"], // Specify the routes the middleware applies to
};