import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {User} from "@/types/User";

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