import {PropertyDetail} from "@/types/Property";

/**
 * Return ImgNotFound.svg if image is not defined
 *        image if its "/api/..."
 *        the route to get an external image if "https"
 * @param image
 */
export function formatImageUrl(image?: string) {

    if (!image) {
        return "/icons/ImgNotFound.svg";
    }

    if (image.startsWith("/api/")) {
        return image;
    }

    if (image.startsWith("https://")) {
        return `/api/images/${encodeURIComponent(image)}`;
    }

    const filename = image.replace(/^\/uploads\//, "");

    return `/api/images/${filename}`;
}

interface uploadedImg {
    url: string,
    purpose: string,
}

/**
 * Check if all images are uploaded on the server by checking all responses
 * @param property
 * @param uploadedImages
 */
export function getUrlImages(property: PropertyDetail, uploadedImages: uploadedImg[]) {
    const cover = uploadedImages.find(
        (upload) => upload.purpose === "property-cover"
    )!.url;

    const pictures = uploadedImages
        .filter((upload) => upload.purpose === "property-picture")
        .map((upload) => upload.url);

    const hostPicture = uploadedImages.find(
        (upload) => upload.purpose === "host-picture"
    )!.url;

    // 3 - Construction payload
    return {
        ...property,
        cover,
        pictures,
        host: {
            ...property.host!,
            picture: hostPicture,
        },
    };

}

/**
 * Define which pictures is in error
 * @param error
 * @param setErrors
 */
export function setPropertyImagesUploadErrors(error: unknown, setErrors: (errors: {
    cover?: string;
    pictures?: string;
    hostPicture?: string;
}) => void) {

    if (error instanceof Error) {
        if (error.message === "cover") {
            setErrors({
                cover: "L'image de couverture n'a pas pu être téléversée",
            });
        }

        if (error.message === "pictures") {
            setErrors({
                pictures: "Une ou plusieurs images n'ont pas pu être téléversée",
            });
        }

        if (error.message === "hostPicture") {
            setErrors({
                hostPicture: "La photo de profil de l'hôte n'a pas pu être téléversée",
            });
        }
    } else {
        setErrors({
            pictures: "Une erreur est survenue lors de la création",
        });
    }

}