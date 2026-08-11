"use client";

import Image from "next/image";

interface PicLightBoxProps {
    src?: string;
    alt?: string;
    className?: string;
    objectPosition?: string;
    onClick?: () => void;
}

/**
 * Picture displayed in the property gallery.
 */
export function PicLightBox({
                                src = "/icons/ImgNotFound.svg",
                                alt = "Titre d'image",
                                className = "",
                                objectPosition = "object-cover object-left",
                                onClick,
                            }: PicLightBoxProps) {

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`Afficher l'image en grand : ${alt}`}
            className={`relative cursor-pointer overflow-hidden ${className}`}
        >
            <Image
                src={src}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={alt}
                className={objectPosition}
            />
        </button>
    );
}
