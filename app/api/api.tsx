import {NextResponse} from "next/server";

const BASE_URL = "http://localhost:3000"

/**
 * Make a request to the backend
 * @param path
 * @param options
 */
export async function apiRequest(path: string, options: RequestInit) {

    try {
        return await fetch(`${BASE_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return Response.json(
            {
                success: false,
                error: "Backend unreachable"
            },
            {status: 503}
        )

    }
}

/**
 * Make a file request to the backend
 * @param path
 * @param options
 */
export async function apiFileRequest(
    path: string,
    options: RequestInit
) {
    try {
        return await fetch(`${BASE_URL}${path}`, {
            ...options,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

/**
 * Return a formated error next response
 * @param status
 * @param error
 */
export function createErrorResponse(status: number, error: string) {

    return NextResponse.json(
        {
            error: error,
        },
        {status: status},
    )
}

/**
 * Fill the apiRequest with a body and the token needed
 * @param url
 * @param method
 * @param token
 * @param body
 */
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

/**
 * Fill the apiRequest with a body (file) and the token needed
 * @param url
 * @param method
 * @param token
 * @param body
 */
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