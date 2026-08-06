import type { MetadataRoute } from "next"
import { getPropertiesForSitemap } from "@/services/properties.sitemap.service"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://arcae.fr"

    const properties = await getPropertiesForSitemap()

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