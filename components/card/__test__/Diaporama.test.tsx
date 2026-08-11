
import {render, screen, fireEvent} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {PropertyGallery} from "@/components/card/Diaporama";


// Mock de next/image
vi.mock("next/image", () => ({
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img {...props} />
    ),
}));


// Mock de PicLightBox pour pouvoir tester facilement le clic
vi.mock("@/components/card/PicLightBox", () => ({
    PicLightBox: ({
        src,
        alt,
        onClick,
    }: {
        src?: string;
        alt?: string;
        onClick?: () => void;
    }) => (
        <button
            type="button"
            aria-label={`Afficher l'image en grand : ${alt}`}
onClick={onClick}
    >
    <img src={src} alt={alt}/>
</button>
),
}));


// Mock de SidePicture
vi.mock("@/components/card/SidePicture", () => ({
    SidePicture: ({
                      pictureTitle,
                      pictureUrl,
                      onClick,
                  }: {
        pictureTitle: string;
        pictureUrl?: string;
        onClick?: () => void;
    }) => (
        <button
            type="button"
            aria-label={`Afficher l'image : ${pictureTitle}`}
            onClick={onClick}
        >
            <img src={pictureUrl} alt={pictureTitle}/>
        </button>
    ),
}));


describe("PropertyGallery", () => {

    const pictures = [
        "/images/cover.jpg",
        "/images/image-1.jpg",
        "/images/image-2.jpg",
        "/images/image-3.jpg",
        "/images/image-4.jpg",
    ];

    it("ouvre le carousel en cliquant sur la cover", () => {

        render(
            <PropertyGallery
                pictures={pictures}
                title="Maison de vacances"
            />
        );

        const coverButton = screen.getByRole("button", {
            name: "Afficher l'image en grand : Maison de vacances",
        });

        fireEvent.click(coverButton);

        expect(
            screen.getByRole("dialog", {
                name: "Galerie photo de Maison de vacances",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByText("Image 1 sur 5")
        ).toBeInTheDocument();
    });


    it("passe à l'image suivante avec le bouton suivant", () => {

        render(
            <PropertyGallery
                pictures={pictures}
                title="Maison de vacances"
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Afficher l'image en grand : Maison de vacances",
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Afficher l'image suivante",
            })
        );

        expect(
            screen.getByText("Image 2 sur 5")
        ).toBeInTheDocument();
    });


    it("revient à l'image précédente avec le bouton précédent", () => {

        render(
            <PropertyGallery
                pictures={pictures}
                title="Maison de vacances"
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Afficher l'image en grand : Maison de vacances",
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Afficher l'image suivante",
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Afficher l'image précédente",
            })
        );

        expect(
            screen.getByText("Image 1 sur 5")
        ).toBeInTheDocument();
    });


    it("boucle vers la dernière image avec ArrowLeft depuis la première", () => {

        render(
            <PropertyGallery
                pictures={pictures}
                title="Maison de vacances"
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Afficher l'image en grand : Maison de vacances",
            })
        );

        fireEvent.keyDown(document, {
            key: "ArrowLeft",
        });

        expect(
            screen.getByText("Image 5 sur 5")
        ).toBeInTheDocument();
    });


    it("boucle vers la première image avec ArrowRight depuis la dernière", () => {

        render(
            <PropertyGallery
                pictures={pictures}
                title="Maison de vacances"
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Afficher l'image en grand : Maison de vacances",
            })
        );

        // 4 fois → pour arriver à la dernière image
        fireEvent.keyDown(document, {
            key: "ArrowRight",
        });

        fireEvent.keyDown(document, {
            key: "ArrowRight",
        });

        fireEvent.keyDown(document, {
            key: "ArrowRight",
        });

        fireEvent.keyDown(document, {
            key: "ArrowRight",
        });

        expect(
            screen.getByText("Image 5 sur 5")
        ).toBeInTheDocument();

        // Une fois de plus → revient à la première
        fireEvent.keyDown(document, {
            key: "ArrowRight",
        });

        expect(
            screen.getByText("Image 1 sur 5")
        ).toBeInTheDocument();
    });


    it("ferme le carousel avec Escape", () => {

        render(
            <PropertyGallery
                pictures={pictures}
                title="Maison de vacances"
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Afficher l'image en grand : Maison de vacances",
            })
        );

        expect(
            screen.getByRole("dialog")
        ).toBeInTheDocument();

        fireEvent.keyDown(document, {
            key: "Escape",
        });

        expect(
            screen.queryByRole("dialog")
        ).not.toBeInTheDocument();
    });


    it("ouvre le carousel directement sur une image secondaire", () => {

        render(
            <PropertyGallery
                pictures={pictures}
                title="Maison de vacances"
            />
        );

        const secondaryButtons = screen.getAllByRole("button", {
            name: "Afficher l'image : Maison de vacances",
        });

        fireEvent.click(secondaryButtons[1]);

        expect(
            screen.getByRole("dialog")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Image 3 sur 5")
        ).toBeInTheDocument();
    });


    it("ne crée pas de carousel pour une galerie sans images", () => {

        render(
            <PropertyGallery
                pictures={[]}
                title="Maison de vacances"
            />
        );

        expect(
            screen.queryByRole("dialog")
        ).not.toBeInTheDocument();
    });

});
