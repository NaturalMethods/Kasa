import {PicLightBox} from "@/components/card/PicLightBox";

interface SidePictureProps {
    pictureTitle: string;
    pictureUrl?: string;
    onClick?: () => void;
}

/**
 * Little picture displayed next to the cover.
 */
export function SidePicture({
                                pictureTitle,
                                pictureUrl,
                                onClick,
                            }: SidePictureProps) {

    return (
        <PicLightBox
            src={pictureUrl || "/icons/ImgNotFound.svg"}
            alt={pictureTitle}
            className="w-21 h-27.25 sm:h-43.5 sm:w-36.75 rounded-[20px]"
            objectPosition="object-cover"
            onClick={onClick}
        />
    );
}
