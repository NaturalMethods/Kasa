import {apiFetch, createErrorResponse} from "@/app/api/api";
import {NextResponse} from "next/server";
import {getTokenFromCookie} from "@/utils/utilsServer";

/**
 * Add a favorite property to a user
 * @param request
 * @param context
 * @constructor
 */
export async function POST(request: Request,
                           context: { params: Promise<{ id: string }> }) {

    const {id} = await context.params

    const token = await getTokenFromCookie()


    const res = await apiFetch(`/api/properties/${id}/favorite`, "POST", token)

    const data = await res.json()

    //If response is not a success, return an error response
    if (res.status !== 200) {
        return createErrorResponse(res.status, data.error)
    }

    return NextResponse.json(await data, {status: data.status})
}

/**
 * Delete a favorite property to a user
 * @param request
 * @param context
 * @constructor
 */
export async function DELETE(request: Request,
                             context: { params: Promise<{ id: string }> }) {

    const {id} = await context.params

    const token = await getTokenFromCookie()


    const res = await apiFetch(`/api/properties/${id}/favorite`, "DELETE", token)

    const data = await res.json()

    //If response is not a success, return an error response
    if (res.status !== 200) {
        return createErrorResponse(res.status, data.error)
    }

    return NextResponse.json(await data, {status: data.status})
}