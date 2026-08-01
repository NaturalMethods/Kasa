import {apiRequest, createErrorResponse} from "@/app/api/api";
import {NextResponse} from "next/server";

export async function POST(req: Request) {

    const body = await req.json()
    const {email, password } = body

    const res = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password}),
    })

    const data = await res.json()

    //If response is not a success, return an error response
    if(res.status !== 200) {
        return createErrorResponse(res.status, data.error)
    }

    const token = data.token
    const user = data.user

    const response = NextResponse.json({user})

    response.cookies.set("kasatoken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });

    /*
    response.cookies.set("kasatoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    }) */


    return response
}