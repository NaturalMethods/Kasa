import type { MetadataRoute } from "next"
import { getProperties } from "@/services/properties.service"
import { PropertyBase } from "@/types/Property"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://arcae.fr"

    const response = await getProperties()
    const properties: PropertyBase[] = await response.json()

    return [
        {
            url: baseUrl,
            changeFrequency: "daily" as const,
            priority: 1,
        },

        ...properties.map((property) => ({
            url: `${baseUrl}/property/${property.slug}`,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })),
    ]
}