import Image from "next/image";
import Link from "next/link";
import { PropertyBase } from "@/types/Property";

interface PropertyCardProps {
    property: PropertyBase;
}

export function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link
            href={`/property/${property.id}-${property.slug}`}
            className="block w-88.75 min-w-88.75 rounded-[20px] bg-white transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainRed"
        >
            <div className="relative h-94 w-88.75 overflow-hidden rounded-t-[20px]">
                <Image
                    src={property.cover ?? "/home/homeheader.svg"}
                    fill
                    sizes="355px"
                    alt={property.title}
                    className="object-cover"
                />
            </div>

            <div className="flex h-44 w-88.75 flex-col justify-between px-6 pt-4 pb-6">
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
    );
}