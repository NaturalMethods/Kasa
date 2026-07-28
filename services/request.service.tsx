const BASE_URL = "http://localhost:3001"

export async function request(
    path: string,
    options: RequestInit
) {
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
                error: "Server unreachable" },
            { status: 503 }
        )

    }
}
export async function requestMultipart(
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
                error: "Server unreachable"
            },
            {
                status: 503
            }
        );

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

export function requestFileFetch(
    url: string,
    method: string,
    body?: FormData
) {
    return requestMultipart(url, {
        method,
        ...(body
            ? {
                body,
            }
            : {}),
    });
}