import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PicLightBox } from "../PicLightBox";


// Mock de Next Image pour utiliser une balise img classique pendant les tests
vi.mock("next/image", () => ({
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img {...props} />
    ),
}));


describe("PicLightBox", () => {

    it("displays the thumbnail image", () => {

        render(
            <PicLightBox
                src="/image.png"
                alt="Appartement"
            />
        );


        expect(
            screen.getByAltText("Appartement")
        ).toBeInTheDocument();

    });


    it("opens the lightbox when clicking on the image", async () => {

        const user = userEvent.setup();


        render(
            <PicLightBox
                src="/image.png"
                alt="Appartement"
            />
        );


        await user.click(
            screen.getByRole("button")
        );


        expect(
            screen.getByLabelText("Fermer")
        ).toBeInTheDocument();

    });


    it("closes the lightbox when clicking on the close button", async () => {

        const user = userEvent.setup();


        render(
            <PicLightBox
                src="/image.png"
                alt="Appartement"
            />
        );


        await user.click(
            screen.getByRole("button")
        );


        await user.click(
            screen.getByLabelText("Fermer")
        );


        expect(
            screen.queryByLabelText("Fermer")
        ).not.toBeInTheDocument();

    });


    it("closes the lightbox when pressing Escape", async () => {

        const user = userEvent.setup();


        render(
            <PicLightBox
                src="/image.png"
                alt="Appartement"
            />
        );


        await user.click(
            screen.getByRole("button")
        );


        fireEvent.keyDown(
            document,
            {
                key: "Escape",
            }
        );


        expect(
            screen.queryByLabelText("Fermer")
        ).not.toBeInTheDocument();

    });

});