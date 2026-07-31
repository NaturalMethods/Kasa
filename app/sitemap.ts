import { MetadataRoute } from "next";

const BASE_URL = "https://ton-domaine.com";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}/login`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/register`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];
}