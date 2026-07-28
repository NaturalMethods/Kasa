import {getTokenFromCookie} from "@/utils/utils";
import {apiFetch} from "@/app/API/api";
import {NextResponse} from "next/server";

export async function GET(request: Request,
                          context: { params: Promise<{ id: string }> }) {

    const { id } = await context.params

    const token = await getTokenFromCookie()

    const data = await apiFetch(`/api/users/${id}/favorites`, "GET", token)

    return NextResponse.json(await data.json(), { status: data.status })

}