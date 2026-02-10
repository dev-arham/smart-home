import { neonAuthMiddleware } from '@neondatabase/auth/next/server';

export default neonAuthMiddleware({
    // Redirects unauthenticated users to sign-in page
    loginUrl: '/login',
});

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/dashboard", "/account"];``

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(pathName);

    const { data: session } = await auth.getSession();

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
    matcher: [
        // Protected routes requiring authentication
        '/login',
        '/signup',
        '/account/:path*',
        '/dashboard/:path*',
    ],
};