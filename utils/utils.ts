
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