import {PropertyCard} from "@/components/card/PropertyCard";
import {PropertyBase} from "@/types/Property";


interface SixGridProps {
    properties: PropertyBase[],
    favorites?: PropertyBase[]
}


export function SixGrid({properties, favorites = []}: SixGridProps) {

    const favoriteIds = new Set(favorites.map((fav) => fav.id));

    return (

        //TODO Revoir le responsive de la grille des cards
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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