import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {User} from "@/types/User";
import {jwtVerify} from "jose";

/**
 * Get the token from the cookie from the client
 */
export async function getTokenFromCookie() {

    const cookieStore = await cookies()
    return cookieStore.get("kasatoken")?.value

}

/**
 * Set the cookie in client, (secure= to be use with https)
 * @param user
 * @param token
 */
export async function setTokenFromCookie(user: User, token: string) {

    const response = NextResponse.json({user})

    /*
       response.cookies.set("kasatoken", token, {
           httpOnly: true,
           secure: false,
           sameSite: "lax",
           path: "/       });

       */
    response.cookies.set("kasatoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    })


    response.cookies.set("hasSession", "true", {
        httpOnly: false,
        sameSite: "strict",
        path: "/",
    });
    return response;
}

export async function getUserIdFromToken(): Promise<number | null> {

    const token = (await cookies()).get("kasatoken")?.value;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );

        if (typeof payload.id !== "number") {
            return null;
        }

        return payload.id;

    } catch {
        return null;
    }
}

export async function verifyTokenById(userId:number) {

    const tokenId = await getUserIdFromToken();

    return tokenId !== null && tokenId === userId;
}