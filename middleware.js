import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req });

    if (req.nextUrl.pathname.startsWith("/doctor") && token?.role !== "doctor") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/patient") && token?.role !== "patient") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/doctor/:path*", "/patient/:path*"]
};
