import {PicLightBox} from "@/components/card/PicLightBox";


interface SidePictureProps {

    pictureTitle: string
    pictureUrl?: string;
}

export function SidePicture({ pictureTitle, pictureUrl= "/home/homeheader.svg" }: SidePictureProps) {

    return(
        <PicLightBox
            src={pictureUrl ?? "/home/homeheader.svg"}
            alt={pictureTitle}
            className="w-21 h-27.25 sm:h-43.5 sm:w-36.75 rounded-[20px]"
            objectPosition="object-cover"
        />
    )
}