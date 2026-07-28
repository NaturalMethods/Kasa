import {ReturnButton} from "@/components/input/ReturnButton";
import {getProperty} from "@/services/properties.service";
import Image from "next/image";
import {PropertyDetail} from "@/types/Property";
import {SidePicture} from "@/components/card/SidePicture";
import {HostCard} from "@/components/card/HostCard";
import {EquipmentCard} from "@/components/card/EquipmentCard";
import {PicLightBox} from "@/components/card/PicLightBox";
import {formatImageUrl} from "@/utils/utils";

interface PropertyPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PropertyPage({ params }: PropertyPageProps){

    // TODO CHECK Fetch avec les ERREURS comme dans signin

    const {slug} = await params;
    const propertyId = slug.split("-")[0];

    const response = await getProperty(propertyId)

    const propertyTemp: PropertyDetail = await response.json()

    //TODO  CHecker sur le site en prod si on voit les images provenant du backend
    // ou faire une route api/images pour que le bff aille chercher les images directement dans le public du backend
    const property = {
        ...propertyTemp,
        cover: formatImageUrl(propertyTemp.cover),
        pictures: propertyTemp.pictures.map(formatImageUrl),
        host: propertyTemp.host
            ? {
                ...propertyTemp.host,
                picture: formatImageUrl(propertyTemp.host.picture),
            }
            : propertyTemp.host,
    };
    console.log(property.cover);

    return(

        <section className={" lg:w-242.5 lg:max-w-242.5 pt-10 pb-10 pl-4 pr-4 lg:pl-0 lg:pr-0 flex flex-col gap-6"}>

            <div className="w-full">
                <ReturnButton text={"Retour aux annonces"}/>
            </div>

            <div className="w-full flex flex-col items-center justify-center lg:items-start lg:flex-row gap-2">

                <PicLightBox
                    src={property?.cover ?? "/home/homeheader.svg"}
                    alt={property?.title}
                    className="w-89.5 h-105.25 md:h-89.25 md:w-75.75 rounded-[20px]"
                    objectPosition="object-cover object-left"
                />

                <div className="flex flex-row lg:flex-col gap-2">

                    <div className={"flex flex-row gap-2"}>
                        <SidePicture pictureTitle={property?.title ?? "Tite d'image"} pictureUrl={property?.pictures[1]}/>
                        <SidePicture pictureTitle={property?.title ?? "Tite d'image"} pictureUrl={property?.pictures[2]}/>
                    </div>

                    <div className={"flex flex-row gap-2"}>
                        <SidePicture pictureTitle={property?.title ?? "Tite d'image"} pictureUrl={property?.pictures[3]}/>
                        <SidePicture pictureTitle={property?.title ?? "Tite d'image"} pictureUrl={property?.pictures[4]}/>
                    </div>

                </div>
                <div className={"hidden lg:block"}>
                    <HostCard property={property} />
                </div>
            </div>

            <div className="max-w-154 bg-white flex flex-col rounded-[10px] p-6 gap-10">

                <div className={"flex flex-col gap-8"}>

                    <div className="w-full flex flex-col gap-4">
                        { /* TODO Peut être rajouter le bouton pour ajouter en favoris */}
                        <h4 className={"text-[24px]"}>{property?.title}</h4>

                        <div className={"flex flex-row gap-2"}>
                            <Image
                                src={"/icons/Beacon.svg"}
                                width={16}
                                height={16}
                                alt={"Icône de localisation"}
                            />
                            <p className={"text-darkGrey"}>{property?.location}</p>
                        </div>
                    </div>

                    <p className={"whitespace-pre-line"}>{property?.description}</p>

                </div>

                <div className={"flex flex-col gap-4"}>
                    <h4>Équipements</h4>
                    <div className="w-79 grid grid-cols-3 gap-2">
                        {property?.equipments.map((equipment) => (
                            <EquipmentCard
                                key={equipment}
                                text={equipment}
                            />
                        ))}
                    </div>
                </div>

                <div className={"flex flex-col gap-4"}>
                    <h4>Catégorie</h4>
                    <div className="w-79 grid grid-cols-3 gap-2">
                        {property?.tags.map((equipment) => (
                            <EquipmentCard
                                key={equipment}
                                text={equipment}
                            />
                        ))}
                    </div>
                </div>

            </div>
            <div className={"lg:hidden"}>
                <HostCard property={property} />
            </div>

        </section>

    )

}