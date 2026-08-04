
/*export function formatImageUrl(path?: string) {

    if (!path) return "";

    if (path.startsWith("/uploads/")) {
        const filename = path.replace("/uploads/", "");

        return `/api/uploads/image/${filename}`;
    }

    return path;
}
*/
export function formatImageUrl(image?: string) {

    console.log("sur le chemin:",image);

    if (!image) {
        return "/icons/ImgNotFound.svg";
    }

    // image S3
    if (image.startsWith("https://")) {
        return `/api/images/${encodeURIComponent(image)}`;
    }

    // image backend
    return `/api/uploads/image/${image}`;
}