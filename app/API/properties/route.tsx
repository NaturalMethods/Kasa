import {getTokenFromCookie} from "@/utils/utils";
import {apiFetch} from "@/app/API/api";
import {NextResponse} from "next/server";


export async function GET() {

    const token = await getTokenFromCookie()

    const data2 = await apiFetch("/api/properties", "GET", token)

    return NextResponse.json(await data2.json(), { status: data2.status })

}