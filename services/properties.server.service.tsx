
export async function getPropertyServer(
    propertyId: string
): Promise<Response> {

    return fetch(
        `http://${process.env.BACKEND_PUBLIC}:${process.env.BACKEND_PORT}/api/properties/${propertyId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );
}