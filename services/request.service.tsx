/**
 * Create a request fetch that will be sent to the server (BFF)
 * @param path
 * @param options
 */
export async function request(
    path: string,
    options: RequestInit
) {
    try {
        return await fetch(`${path}`, {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {

        console.error("FETCH ERROR:", e);

        return Response.json(
            {
                success: false,
                error: "Server unreachable"
            },
            {status: 503}
        )

    }
}

/**
 * Create a request for file that will be sent to server
 * @param path
 * @param options
 */
export async function requestMultipart(
    path: string,
    options: RequestInit
) {
    try {
        return await fetch(`${path}`, {
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

/**
 * Fill the request that will be sent to the server
 * @param url
 * @param method
 * @param body
 */
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

/**
 * Fill the file request that will be sent to the server
 * @param url
 * @param method
 * @param body
 */
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