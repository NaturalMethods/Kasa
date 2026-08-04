import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function proxy(req: NextRequest) {

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

        response.cookies.delete("token")

        return response
    }
}

// TODO Autorisé le home et

export const config = {
    matcher: [
        "/",

    ],
};