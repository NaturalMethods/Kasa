import Image from "next/image";
import {MainRedButton} from "@/components/input/MainRedButton";
import {PropertyDetail} from "@/types/Property";

interface HostCardProps {
    property?: PropertyDetail
}

/**
 * Displayed the host of a property
 * @param param0
 * @param param0.property
 * @constructor
 */
export function HostCard({property}: HostCardProps) {

    return (

        <div className="flex flex-col bg-white rounded-[10px] w-86.25 h-70.25 p-6 gap-2">
            <h3 className={"text-[16px] font-medium"}>Votre hôte</h3>
            <div className={"flex flex-row items-center gap-4.5 pt-4 pb-4"}>

                <div className="relative h-20.5 w-20.5 overflow-hidden rounded-[20px]">
                    <Image
                        src={property?.host?.picture || "/icons/ImgNotFound.svg"}
                        fill
                        sizes="303px"
                        alt={property?.title ?? "Titre d'image"}
                        className="object-cover object-left"
                    />
                </div>
                <p className={"text-[16px]"}>{property?.host?.name ?? "Nom du logement"}</p>
                <div className={" flex flex-row bg-lightGrey rounded-[10px] p-2 gap-1"}>
                    <Image
                        src={"/icons/Star.svg"}
                        width={19}
                        height={23}
                        alt={property?.title ?? "Titre d'image"}
                    />
                    {/* TODO rating de l'hôte ? */}
                    <p className={"text-[16px]"}>{property?.ratings_count}</p>
                </div>

            </div>
            {/* TODO Connecter les boutons a la page messagerie */}
            <MainRedButton width={297} height={36}>{"Contacter l'hôte"}</MainRedButton>
            <MainRedButton width={297} height={36}>{"Envoyer un message"}</MainRedButton>
        </div>

    )

}