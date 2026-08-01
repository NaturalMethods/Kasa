const BASE_URL = process.env.NEXT_PUBLIC_IP

export async function request(
    path: string,
    options: RequestInit
) {
    try {
        console.log("path:", path , "url:", BASE_URL)
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
        credentials: "include",
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