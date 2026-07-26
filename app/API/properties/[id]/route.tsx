import {getTokenFromCookie} from "@/utils/utils";
import {apiFetch} from "@/app/API/api";
import {NextResponse} from "next/server";

export async function GET(request: Request,
                          context: { params: Promise<{ id: string }> }) {

    const { id } = await context.params

    const token = await getTokenFromCookie()

    const data2 = await apiFetch(`/api/properties/${id}`, "GET", token)

    console.log("Data2",data2)

    return NextResponse.json(await data2.json(), { status: data2.status })

}