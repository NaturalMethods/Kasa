import {requestFileFetch} from "@/services/request.service";

export async function uploadImage(file: File, purpose: string) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("purpose", purpose);

    return requestFileFetch("/API/uploads/image", "POST", formData);
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