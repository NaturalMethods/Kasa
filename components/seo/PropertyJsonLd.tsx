import {PropertyDetail} from "@/types/Property";

interface PropertyJsonLdProps {
    property: PropertyDetail;
}

export function PropertyJsonLd({
                                   property,
                               }: PropertyJsonLdProps) {

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const images = [
        property.cover,
        ...property.pictures,
    ]
        .filter(Boolean)
        .map((image) =>
            image?.startsWith("http")
                ? image
                : `${baseUrl}${image}`
        )
        .filter((image, index, array) =>
            array.indexOf(image) === index
        );

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VacationRental",

        "name": property.title,

        "description": property.description,

        ...(images.length > 0 && {
            "image": images,
        }),

        "address": {
            "@type": "PostalAddress",
            "addressLocality": property.location,
        },

        ...(property.equipments.length > 0 && {
            "amenityFeature": property.equipments.map((equipment) => ({
                "@type": "LocationFeatureSpecification",
                "name": equipment,
                "value": true,
            })),
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
