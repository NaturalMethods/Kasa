import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const publicRoutes = [
    "/",
    "/about",
    "/login",
    "/api/login",
    "/signin",
    "/api/signin",
    "/api/properties",
]

export async function proxy(req: NextRequest) {

    console.log("PATH", req.nextUrl.pathname);
    console.log("COOKIE", req.cookies.get("kasatoken")?.value);

    const { pathname } = req.nextUrl

    // Autoriser les routes publiques
    if (
        publicRoutes.includes(pathname) ||
        (
            pathname.startsWith("/property/")
            && !pathname.startsWith("/property/new")
        ) ||
        pathname.startsWith("/api/properties")
    ) {
        return NextResponse.next()
    }

    const token = req.cookies.get("kasatoken")?.value

    if (!token) {
        return NextResponse.redirect(
            new URL("/login", req.url)
        )
    }

    try {
        await jwtVerify(
            token,
            new TextEncoder().encode(
                process.env.JWT_SECRET
            )
        )

        return NextResponse.next()

    } catch {

        const response = NextResponse.redirect(
            new URL("/login", req.url)
        )

        response.cookies.delete("kasatoken")

        return response
    }
}
export const config = {
    matcher: [
        "/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)",
    ],
};