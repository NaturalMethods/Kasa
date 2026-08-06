"use client"

import {ReturnButton} from "@/components/input/ReturnButton";
import {MainRedButton} from "@/components/input/MainRedButton";
import {InputField} from "@/components/input/InputField";
import {useState} from "react";
import {InputArea} from "@/components/input/InputArea";
import {PropertyPicsForm} from "@/components/input/PropertyPicsForm";
import {InputPic} from "@/components/input/InputPic";
import {PropertyDetail} from "@/types/Property";
import {deleteImages, uploadPropertyImages} from "@/services/uploads.service";
import {validateNewPropertyForm} from "@/utils/validation";
import {createProperty} from "@/services/properties.service";
import {EquipmentsForm} from "@/components/input/EquipmentsForm";
import {CategoriesForm} from "@/components/input/CategoriesForm";
import {useRouter} from "next/navigation";
import {getUrlImages, setPropertyImagesUploadErrors} from "@/utils/utils";

/**
 * Content of the NewProperty page
 * @constructor
 */
export default function NewProperty() {

    const router = useRouter()

    /**
     * Create an empty shell to store datas from the form that will be send
     */
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
            picture: "",
        },
    });


    const [propertyCoverFile, setPropertyCoverFile] = useState<File | null>(null);
    const [propertyPicturesFile, setPropertyPicturesFile] = useState<(File | null)[]>([null]);
    const [hostPicFile, setHostPicFile] = useState<File | null>(null);
    const [postalCode, setPostalCode] = useState("");

    /**
     * Store which field is in error
     */
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

    /**
     * Send the new property to the server
     * @param propertyPayload
     */
    async function sendProperty(propertyPayload: PropertyDetail) {

        const response = await createProperty(propertyPayload);

        if (!response.ok) {
            throw new Error("Impossible de créer la propriété");
        }

        const createdProperty = await response.json();

        router.push(`/property/${createdProperty.id}-${createdProperty.slug}`);
        router.refresh();

    }


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setErrors({});

        const validation = validateNewPropertyForm({
            property,
            propertyCoverFile,
            propertyPicturesFile,
            hostPicFile,
        });

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        let uploadedImages: { url: string; purpose: string }[] = [];

        try {
            /**
             * Upload all images to the backend
             */
            uploadedImages = await uploadPropertyImages({
                cover: propertyCoverFile,
                pictures: propertyPicturesFile,
                hostPicture: hostPicFile,
            });

            /**
             * Check if all images are uploaded
             */
            const hasCover = uploadedImages.some(
                (upload) => upload.purpose === "property-cover"
            );

            const picturesCount = uploadedImages.filter(
                (upload) => upload.purpose === "property-picture"
            ).length;

            const hasHostPicture = uploadedImages.some(
                (upload) => upload.purpose === "host-picture"
            );


            if (!hasCover) {
                throw new Error("cover");
            }

            if (picturesCount !== propertyPicturesFile.filter(Boolean).length) {
                throw new Error("pictures");
            }

            if (!hasHostPicture) {
                throw new Error("hostPicture");
            }

            /**
             * Set url of images in the property payload and send it
             */
            const propertyPayload = getUrlImages(
                {
                    ...property,
                    location: `${property.location} - ${postalCode}`,
                },
                uploadedImages
            );
            await sendProperty(propertyPayload);


        } catch (error) {
            console.error("Erreur création propriété :", error);

            if (uploadedImages.length > 0) {
                try {
                    /**
                     * if an error occured during images upload, delete all images, to retry with a clean attempt
                     */
                    await deleteImages(uploadedImages.map((image) => image.url));
                } catch (deleteError) {
                    console.error(
                        "Erreur suppression images temporaires :",
                        deleteError
                    );
                }
            }

            setPropertyImagesUploadErrors(error, setErrors);
        }
    }

    return (

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
                    <InputField
                        name={"Code postal"}
                        id={"propertyCode"}
                        value={postalCode}
                        setValue={setPostalCode}
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

                    <div
                        className={"flex flex-col lg:pb-12 lg:pt-12 lg:pl-20 lg:pr-20 p-4 bg-white rounded-[10px] gap-4"}>

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
                                    className={"w-full"}
                        />
                        <InputPic name={"Photo de profil"} id={"hostPic"} setFile={setHostPicFile}
                                  error={!!errors.hostPicture}/>
                    </div>
                </div>


            </div>
            <div className={"flex flex-col lg:flex-row w-full gap-4"}>
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