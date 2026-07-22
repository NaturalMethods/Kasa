const BASE_URL = "http://localhost:3000"

export async function request(
    path: string,
    options: RequestInit
) {
    try {
        const res = await fetch(`${BASE_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        })

        return res.json()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch (e) {

        return Response.json(
            {   success: false,
                error: "Server unreachable" },
            { status: 503 }
        )

    }
}

export function requestFetch(
    url: string,
    method: string,
    body?: unknown,
) {

    return request(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        ...(method !== "GET" && body
            ? {
                body: JSON.stringify(body),
            }
            : {}),
    })
}