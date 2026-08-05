import {NextResponse} from "next/server"

/**
 * Route to delete the JWT token to log out
 * @constructor
 */
export async function POST() {

    const response = NextResponse.json({
        success: true
    })

    response.cookies.delete("kasatoken")
    response.cookies.delete("hasSession")

    return response
}