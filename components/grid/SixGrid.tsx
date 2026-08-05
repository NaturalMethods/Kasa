import {PropertyCard} from "@/components/card/PropertyCard";
import {PropertyBase} from "@/types/Property";
import {useEffect} from "react";


interface SixGridProps {
    properties: PropertyBase[],
    favorites?: PropertyBase[]
}

/**
 * Grid to display 6 property card
 * @param param0
 * @param param0.properties
 * @param param0.favorites
 * @constructor
 */
export function SixGrid({properties, favorites = []}: SixGridProps) {

    useEffect(() => {


    }, [favorites]);

    const favoriteIds = new Set(favorites.map((fav) => fav.id));

    return (

        <section className="w-full md:grid flex flex-col md:grid-cols-2 lg:grid-cols-3 gap-6 items-center ">
            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                    favorite={favoriteIds.has(property.id)}
                />
            ))}
        </section>

    )

}