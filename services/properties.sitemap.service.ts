import { PropertyBase } from "@/types/Property"

/**
 * Get properties directly from backend for sitemap generation
 */
export async function getPropertiesForSitemap(): Promise<PropertyBase[]> {
    const backendUrl = `http://${process.env.BACKEND_PUBLIC}:${process.env.BACKEND_PORT}`

    const response = await fetch(
        `${backendUrl}/api/properties`,
        {
            cache: "no-store",
        }
    )

    if (!response.ok) {
        throw new Error(
            `Unable to fetch properties for sitemap: ${response.status}`
        )
    }

    return response.json()
}