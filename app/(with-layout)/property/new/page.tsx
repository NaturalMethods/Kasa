"use client"

import {ReturnButton} from "@/components/input/ReturnButton";
import {MainRedButton} from "@/components/input/MainRedButton";
import {InputField} from "@/components/input/InputField";
import {useState} from "react";
import {InputArea} from "@/components/input/InputArea";
import {PropertyPicsForm} from "@/components/input/PropertyPicsForm";
import {InputPic} from "@/components/input/InputPic";
import {PropertyDetail} from "@/types/Property";
import {uploadPropertyImages} from "@/services/uploads.service";
import {validateNewPropertyForm} from "@/utils/validation";
import {createProperty} from "@/services/properties.service";
import {EquipmentsForm} from "@/components/input/EquipmentsForm";
import {CategoriesForm} from "@/components/input/CategoriesForm";
import {useRouter} from "next/navigation";


export default function NewProperty(){

    const router = useRouter()

    const [property, setProperty] = useState<PropertyDetail>({
        id: "",
        title: "",
        description: "",
        cover: "",
        location: "",
        price_per_night: 0,
        pictures: [],
        equipments: [],
        tags: [],
        host: {
            id: 0,
            name: "",
            email: "",
            role: "owner",
            picture:"",
        },
    });

    const [propertyCoverFile, setPropertyCoverFile] = useState<File | null>(null);
    const [propertyPicturesFile, setPropertyPicturesFile] = useState<(File | null)[]>([null]);
    const [hostPicFile, setHostPicFile] = useState<File | null>(null);

    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        location?: string;
        price_per_night?: string;
        cover?: string;
        pictures?: string;
        hostName?: string;
        hostPicture?: string;
    }>({});

    function updateProperty<K extends keyof PropertyDetail>(
        key: K,
        value: PropertyDetail[K]
    ) {
        setProperty((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        //TODO faire l'envoi du formulaire a l'API et les différents envoie au backend

        setErrors({});

        const validation = validateNewPropertyForm({
            property,
            propertyCoverFile,
            propertyPicturesFile,
            hostPicFile,
        });

        //TODO vérifier que les fichiers sont des images cotés serveur
        if (!validation.isValid) {
            console.log(validation.errors);
            setErrors(validation.errors);
            return;
        }

        try {

            // 1 - Upload des images
            const uploads = await uploadPropertyImages({
                cover: propertyCoverFile,
                pictures: propertyPicturesFile,
                hostPicture: hostPicFile,
            });

            //TODO une image ne s'est pas uploadé ? error
            console.log("Images uploadées :", uploads);

// 2 - Récupération des URLs
            const cover = uploads.find(
                (upload) => upload.purpose === "property-cover"
            )?.url ?? "";

            const pictures = uploads
                .filter((upload) => upload.purpose === "property-picture")
                .map((upload) => upload.url);

            const hostPicture = uploads.find(
                (upload) => upload.purpose === "host-picture"
            )?.url ?? "";


            // 3 - Construction du payload propriété
            const propertyPayload = {
                ...property,
                cover,
                pictures,
                host: {
                    ...property.host!,
                    picture: hostPicture,
                },
            };

            console.log("Property à envoyer :", propertyPayload);


            // 4 - POST création propriété
            const response = await createProperty(propertyPayload);

            if (!response.ok) {
                //TODO gestion erreur
                return;
            }

            const createdProperty = await response.json();

            console.log(createdProperty);

            router.push(`/property/${createdProperty.id}-${createdProperty.slug}`)
            router.refresh()



        } catch (error) {
            console.error("Erreur création propriété :", error);
        }

    }
    return(

        <form onSubmit={handleSubmit}
            className={" lg:w-292 lg:max-w-278.75 pt-10 pb-10 pl-4 pr-4 lg:pl-0 lg:pr-0 flex flex-col gap-6"}>

            <div className="w-full">
                <ReturnButton text={"Retour"}/>
            </div>
            <div className={" w-full lg:maw-w-278.75 flex flex-row justify-between"}>
                <h4 className={"text-[24px]"}>Ajouter une propriété</h4>
                <MainRedButton type={"submit"} width={96} height={36}>Ajouter</MainRedButton>
            </div>

            <div className={"flex flex-col lg:flex-row gap-4"}>

                {/* Property basics */}
                <div className={"flex flex-col h-fit lg:p-20 p-4 bg-white rounded-[10px] gap-4"}>

                    <InputField name={"Titre de la propriété"}
                                id={"propertyName"}
                                value={property.title}
                                setValue={(value) => updateProperty("title", value)}
                                placeholder={"Ex: Appartement cosy au coeur de paris"}
                                className={"font-normal text-[12px] text-darkGrey"}
                                error={!!errors.title}
                    />
                    <InputArea name={"Description"}
                                id={"propertyDesc"}
                                value={property.description}
                                setValue={(value) => updateProperty("description", value)}
                                placeholder={"Décrivez votre propriété en détail..."}
                                className={"font-normal text-[12px] text-darkGrey h-30"}
                               error={!!errors.description}
                    />
                    {/* TODO Concaténer localisation + code postal */}
                    <InputField name={"Code postal"}
                                id={"propertyCode"}
                                className={"font-normal text-[12px] text-darkGrey"}
                    />
                    <InputField name={"Localisation"}
                                id={"propertyLoc"}
                                value={property.location}
                                setValue={(value) => updateProperty("location", value)}
                                className={"font-normal text-[12px] text-darkGrey"}
                                error={!!errors.location}
                    />

                </div>

                {/* Property Pics */}
                <div className={"flex flex-col justify-between gap-4"}>

                    <PropertyPicsForm propertyCoverFile={propertyCoverFile}
                                      setPropertyCoverFile={setPropertyCoverFile}
                                      propertyPicturesFile={propertyPicturesFile}
                                      setPropertyPicturesFile={setPropertyPicturesFile}
                                      errorCover={!!errors.cover}
                                      errorPictures={!!errors.pictures}
                    />

                    <div className={"flex flex-col lg:pb-12 lg:pt-12 lg:pl-20 lg:pr-20 p-4 bg-white rounded-[10px] gap-4"}>

                        <InputField name={"Nom de l'hôte"}
                                    id={"hostname"}
                                    value={property.host?.name ?? ""}
                                    setValue={(value) =>
                                        updateProperty("host", {
                                            ...property.host!,
                                            name: value,
                                        })
                                    }
                                    error={!!errors.hostName}
                        />
                        <InputPic name={"Photo de profil"} id={"hostpic"} setFile={setHostPicFile} error={!!errors.hostPicture} />
                    </div>
                </div>




            </div>
            <div className={"flex flex-row w-full gap-4"}>
                <EquipmentsForm
                    selectedEquipments={property.equipments}
                    setSelectedEquipments={(equipments) =>
                        updateProperty("equipments", equipments)
                    }
                />
                <CategoriesForm selectedCategories={property.tags}
                                setSelectedCategories={(tags) => updateProperty("tags", tags)}/>
            </div>
        </form>

    )

}