import {NextResponse} from "next/server";

const BASE_URL = "http://localhost:3000"

export async function apiRequest(path: string, options: RequestInit) {

    try {
        return await fetch(`${BASE_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch (e) {
        return Response.json(
            {   success: false,
                error: "Backend unreachable" },
            { status: 503 }
        )

    }
}

export async function apiFileRequest(
    path: string,
    options: RequestInit
) {
    try {
        return await fetch(`${BASE_URL}${path}`, {
            ...options,
        });

    } catch (e) {

        return Response.json(
            {
                success: false,
                error: "Backend unreachable"
            },
            {
                status: 503
            }
        );

    }
}

export function createErrorResponse(status:number,error:string) {

        return NextResponse.json(
            {
                error: error,
            },
            { status: status },
        )
}

export function apiFetch(
    url: string,
    method: string,
    token?: string | undefined,
    body?: unknown,
) {

    return apiRequest(url, {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        ...(method !== "GET" && body
            ? {
                body: JSON.stringify(body),
            }
            : {}),
    })
}

export function apiFileFetch(
    url: string,
    method: string,
    token?: string,
    body?: FormData,
) {

    return apiFileRequest(url, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        ...(body
            ? {
                body,
            }
            : {}),
    });

}