import {requestFetch, requestFileFetch} from "@/services/request.service";


//TODO si c'est un owner qui upload et supprime les images ?
export async function uploadImage(file: File, purpose: string) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("purpose", purpose);

    return requestFileFetch("/api/uploads/image", "POST", formData);
}

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