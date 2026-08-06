import {apiFetch} from "@/app/api/api";
import {NextResponse} from "next/server";

/**
 * Get a property by its ID
 * @param request
 * @param context
 * @constructor
 */
export async function GET(request: Request,
                          context: { params: Promise<{ id: string }> }) {

    console.log("Reeee")
    const {id} = await context.params
    console.log("REcup")
    const data2 = await apiFetch(`/api/properties/${id}`, "GET")

    return NextResponse.json(await data2.json(), {status: data2.status})

}