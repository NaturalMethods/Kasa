"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";

import {PicLightBox} from "@/components/card/PicLightBox";
import {SidePicture} from "@/components/card/SidePicture";

interface PropertyGalleryProps {
    pictures: string[];
    title: string;
}

const FALLBACK_IMAGE = "/icons/ImgNotFound.svg";

export function PropertyGallery({
                                    pictures,
                                    title,
                                }: PropertyGalleryProps) {

    /*
     * pictures[0] = cover
     * pictures[1..4] = secondary pictures
     */

    const cover = pictures[0] || FALLBACK_IMAGE;

    /*
     * Only real images are included in the carousel.
     * The fallback image is used only to preserve the layout.
     */
    const carouselImages = pictures.filter(Boolean);

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {

        function handleKeyboard(event: KeyboardEvent) {

            if (!isOpen) {
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                setIsOpen(false);
                return;
            }

            if (carouselImages.length <= 1) {
                return;
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();

                setCurrentIndex((current) =>
                    current === 0
                        ? carouselImages.length - 1
                        : current - 1
                );

                return;
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();

                setCurrentIndex((current) =>
                    current === carouselImages.length - 1
                        ? 0
                        : current + 1
                );
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyboard);
            closeButtonRef.current?.focus();
        }

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };

    }, [isOpen, carouselImages.length]);

    function openCarousel(index: number) {

        if (carouselImages.length === 0) {
            return;
        }

        setCurrentIndex(index);
        setIsOpen(true);
    }

    function previousImage(event: React.MouseEvent<HTMLButtonElement>) {

        event.stopPropagation();

        setCurrentIndex((current) =>
            current === 0
                ? carouselImages.length - 1
                : current - 1
        );
    }

    function nextImage(event: React.MouseEvent<HTMLButtonElement>) {

        event.stopPropagation();

        setCurrentIndex((current) =>
            current === carouselImages.length - 1
                ? 0
                : current + 1
        );
    }

    return (
        <>
            <div
                className="w-full flex flex-col items-center justify-center lg:items-start lg:flex-row gap-2"
            >

                {/* Cover */}
                <PicLightBox
                    src={cover}
                    alt={title}
                    className="w-89.5 h-105.25 md:h-89.25 md:w-75.75 rounded-[20px]"
                    objectPosition="object-cover object-left"
                    onClick={() => openCarousel(0)}
                />

                {/* Secondary pictures */}
                <div className="flex flex-row lg:flex-col gap-2">

                    <div className="flex flex-row gap-2">

                        <SidePicture
                            pictureTitle={title}
                            pictureUrl={pictures[1] || FALLBACK_IMAGE}
                            onClick={
                                pictures[1]
                                    ? () => openCarousel(1)
                                    : undefined
                            }
                        />

                        <SidePicture
                            pictureTitle={title}
                            pictureUrl={pictures[2] || FALLBACK_IMAGE}
                            onClick={
                                pictures[2]
                                    ? () => openCarousel(2)
                                    : undefined
                            }
                        />

                    </div>

                    <div className="flex flex-row gap-2">

                        <SidePicture
                            pictureTitle={title}
                            pictureUrl={pictures[3] || FALLBACK_IMAGE}
                            onClick={
                                pictures[3]
                                    ? () => openCarousel(3)
                                    : undefined
                            }
                        />

                        <SidePicture
                            pictureTitle={title}
                            pictureUrl={pictures[4] || FALLBACK_IMAGE}
                            onClick={
                                pictures[4]
                                    ? () => openCarousel(4)
                                    : undefined
                            }
                        />

                    </div>

                </div>

            </div>

            {/* Carousel */}
            {isOpen && carouselImages.length > 0 && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Galerie photo de ${title}`}
                    onClick={() => setIsOpen(false)}
                >

                    {/* Previous */}
                    {carouselImages.length > 1 && (
                        <button
                            type="button"
                            aria-label="Afficher l'image précédente"
                            onClick={previousImage}
                            className="
                                absolute
                                left-6
                                z-20
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                bg-black/50
                                text-3xl
                                text-white
                                cursor-pointer
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-white
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-black
                            "
                        >
                            <span aria-hidden="true">‹</span>
                        </button>
                    )}

                    {/* Close */}
                    <button
                        ref={closeButtonRef}
                        type="button"
                        aria-label="Fermer la galerie"
                        onClick={() => setIsOpen(false)}
                        className="
                            absolute
                            right-6
                            top-6
                            z-20
                            text-4xl
                            text-white
                            cursor-pointer
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-white
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-black
                            rounded
                        "
                    >
                        <span aria-hidden="true">×</span>
                    </button>

                    {/* Carousel viewport */}
                    <div
                        className="relative h-[90vh] w-[90vw] overflow-hidden"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div
                            className="flex h-full transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                            }}
                        >
                            {carouselImages.map((image, index) => (
                                <div
                                    key={image}
                                    className="relative h-full w-full min-w-full shrink-0"
                                    aria-hidden={index !== currentIndex}
                                >
                                    <Image
                                        src={image}
                                        fill
                                        sizes="90vw"
                                        alt={`${title} - Image ${index + 1}`}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next */}
                    {carouselImages.length > 1 && (
                        <button
                            type="button"
                            aria-label="Afficher l'image suivante"
                            onClick={nextImage}
                            className="
                                absolute
                                right-6
                                z-20
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                bg-black/50
                                text-3xl
                                text-white
                                cursor-pointer
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-white
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-black
                            "
                        >
                            <span aria-hidden="true">›</span>
                        </button>
                    )}

                    {/* Counter / screen reader announcement */}
                    <span
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        Image {currentIndex + 1} sur {carouselImages.length}
                    </span>

                </div>
            )}
        </>
    );
}
