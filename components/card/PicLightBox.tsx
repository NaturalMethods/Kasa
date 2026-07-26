"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

interface PicLightBoxProps {
    src: string;
    alt?: string;
    className?: string;
    objectPosition?: string;
}

export function PicLightBox({
                                src,
                                alt="Titre d'image",
                                className = "",
                                objectPosition = "object-cover object-left",
                            }: PicLightBoxProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    return (
        <>
            {/* Miniature */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`relative cursor-pointer overflow-hidden ${className}`}
            >
                <Image
                    src={src}
                    fill
                    sizes="303px"
                    alt={alt}
                    className={objectPosition}
                />
            </button>

            {/* Lightbox */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
                    onClick={() => setIsOpen(false)}
                >
                    <button
                        type="button"
                        aria-label="Fermer"
                        className="absolute right-6 top-6 text-4xl text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        ×
                    </button>

                    <div
                        className="relative h-[90vh] w-[90vw]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={src}
                            fill
                            sizes="90vw"
                            alt={alt}
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}