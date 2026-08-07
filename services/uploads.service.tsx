import {requestFetch, requestFileFetch} from "@/services/request.service";

/**
 * Send file (image only) to be uploaded to the backend
 * @param file
 * @param purpose
 */
export async function uploadImage(file: File, purpose: string) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("purpose", purpose);

    return requestFileFetch("/api/uploads/image", "POST", formData);
}

/**
 * Ask the server to delete image from the backend
 * @param filenames
 */
export async function deleteImages(filenames: (string | undefined)[]) {
    return await requestFetch(
        "/api/uploads/image",
        "DELETE",
        {
            filenames: filenames.filter(
                (filename): filename is string =>
                    filename !== undefined && filename.trim() !== ""
            ),
        }
    );
}

interface UploadPropertyImagesParams {
    cover: File | null;
    pictures: (File | null)[];
    hostPicture: File | null;
}

/**
 * Upload multiple images for a new property to server and wait for all the response
 * @param param0
 * @param param0.cover
 * @param param0.pictures
 * @param param0.hostPicture
 */
export async function uploadPropertyImages({
                                               cover,
                                               pictures,
                                               hostPicture,
                                           }: UploadPropertyImagesParams) {


    const coverPromise = cover
        ? uploadImage(cover, "property-cover")
        : null;


    const picturesPromises = pictures
        .filter((file): file is File => file !== null)
        .map((file) =>
            uploadImage(file, "property-picture")
        );


    const hostPromise = hostPicture
        ? uploadImage(hostPicture, "host-picture")
        : null;


    const responses = await Promise.all([
        ...(coverPromise ? [coverPromise] : []),
        ...picturesPromises,
        ...(hostPromise ? [hostPromise] : []),
    ]);


    return await Promise.all(
        responses.map((response) => response.json())
    );
}