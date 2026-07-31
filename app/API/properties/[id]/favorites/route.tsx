import {getTokenFromCookie} from "@/utils/utilsServer";
import {apiFetch} from "@/app/api/api";
import {NextResponse} from "next/server";

export async function GET(request: Request,
                          context: { params: Promise<{ id: string }> }) {

    const { id } = await context.params

    const token = await getTokenFromCookie()

    const data = await apiFetch(`/api/users/${id}/favorites`, "GET", token)

    return NextResponse.json(await data.json(), { status: data.status })

}