import { PropertyDetail } from "@/types/Property";

interface PropertyJsonLdProps {
    property: PropertyDetail;
}

export function PropertyJsonLd({
                                   property,
                               }: PropertyJsonLdProps) {

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Accommodation",

        "name": property.title,

        "description": property.description,

        "image": [
            property.cover,
            ...property.pictures,
        ],

        "address": {
            "@type": "PostalAddress",
            "addressLocality": property.location,
        },

        "amenityFeature": property.equipments.map((equipment) => ({
            "@type": "LocationFeatureSpecification",
            "name": equipment,
            "value": true,
        })),

        "category": property.tags.join(", "),

        ...(property.host && {
            "host": {
                "@type": "Person",
                "name": property.host.name,
            },
        }),
    };


    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd),
            }}
        />
    );
}