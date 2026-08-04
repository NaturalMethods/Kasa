
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

    if (image.startsWith("/api/")) {
        return image;
    }

    if (image.startsWith("https://")) {
        return `/api/images/${encodeURIComponent(image)}`;
    }

    const filename = image.replace(/^\/uploads\//, "");

    return `/api/uploads/image/${filename}`;
}