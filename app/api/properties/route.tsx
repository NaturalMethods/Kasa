import {getTokenFromCookie} from "@/utils/utilsServer";
import {apiFetch, createErrorResponse} from "@/app/api/api";
import {NextResponse} from "next/server";

/**
 * Get all properties
 * @constructor
 */
export async function GET() {
    const data2 = await apiFetch("/api/properties", "GET")

    return NextResponse.json(await data2.json(), {status: data2.status})

}

/**
 * Create a new property
 * @param request
 * @constructor
 */
export async function POST(request: Request) {

    try {

        const body = await request.json();

        const token = await getTokenFromCookie();

        const res = await apiFetch("/api/properties", "POST", token, body);

        const data = await res.json();

        if (!res.ok) {
            return createErrorResponse(
                res.status,
                data.error ?? "Erreur lors de la création de la propriété"
            );
        }

        return NextResponse.json(data, {
            status: res.status,
        });

    } catch (error) {

        console.error("Create property error:", error);

        return createErrorResponse(
            500,
            "Erreur lors de la création de la propriété"
        );
    }
}