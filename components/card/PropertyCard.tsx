import Image from "next/image";
import Link from "next/link";
import { PropertyBase } from "@/types/Property";
import {addFavorite, removeFavorite} from "@/services/properties.service";
import {useState} from "react";

interface PropertyCardProps {
    property: PropertyBase;
    favorite?: boolean;
    onFavoriteClick?: (property: PropertyBase) => void;
}

export function PropertyCard({ property, favorite = false}: PropertyCardProps) {

    const [isFavorite, setIsFavorite] = useState(favorite);

    async function handleFavorite() {

        if (isFavorite) {
            const resp = await removeFavorite(property.id);

            if (resp.status === 200) {
                setIsFavorite(false);
            }
        } else {
            const resp = await addFavorite(property.id);

            if (resp.status === 200) {
                setIsFavorite(true);
            }
        }

    }

    return (
        <div className="relative w-full max-w-[355px] min-w-0">
            <Link
                href={`/property/${property.id}-${property.slug}`}
                className="block w-full rounded-[20px] bg-white transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainRed"
            >
                <div className="relative h-94 w-full overflow-hidden rounded-t-[20px]">
                    <Image
                        src={property.cover ?? "/home/homeheader.svg"}
                        fill
                        sizes="(max-width: 768px) 100vw, 355px"
                        alt={property.title}
                        className="object-cover"
                    />
                </div>

                <div className="flex h-44 w-full flex-col justify-between px-6 pt-4 pb-6">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-medium">{property.title}</h3>
                        <p className="text-darkGrey">{property.location}</p>
                    </div>

                    <p className="text-darkGrey">
                <span className="font-medium text-black">
                    {property.price_per_night}€
                </span>{" "}
                        par nuit
                    </p>
                </div>
            </Link>

            <button
                type="button"
                className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[5px] ${
                    isFavorite ? "bg-mainRed" : "bg-lightGrey"
                }`}
                aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                onClick={handleFavorite}
            >
                <Image
                    src={isFavorite ? "/icons/LightGreyHeart.svg" : "/icons/GreyHeart.svg"}
                    width={16}
                    height={16}
                    alt=""
                />
            </button>
        </div>
    );
}