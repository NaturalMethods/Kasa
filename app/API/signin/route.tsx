import { NextResponse } from "next/server"
import {apiRequest, createErrorResponse} from "@/app/api/api"

export async function POST(req: Request) {

    const body = await req.json()
    const { name,email, password } = body

    const res = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role:"client" }),
    })

    const data = await res.json()

    //If response is not a success, return an error response
    if(res.status !== 201) {
        return createErrorResponse(res.status, data.error)
    }

    const token = data.token
    const user = data.user

    const response = NextResponse.json({user})

    response.cookies.set("kasatoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    })


    return response
}