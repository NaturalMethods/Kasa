import {PicLightBox} from "@/components/card/PicLightBox";


interface SidePictureProps {

    pictureTitle: string
    pictureUrl?: string;
}

/**
 * Little pictures on the right side of the cover in the property detail page
 * @param param0
 * @param param0.pictureTitle
 * @param param0.pictureUrl
 * @constructor
 */
export function SidePicture({pictureTitle, pictureUrl}: SidePictureProps) {

    return (
        <PicLightBox
            src={pictureUrl || "/icons/ImgNotFound.svg"}
            alt={pictureTitle}
            className="w-21 h-27.25 sm:h-43.5 sm:w-36.75 rounded-[20px]"
            objectPosition="object-cover"
        />
    )
}