import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import Favorites from "../page";

import { useUser } from "@/contexts/useUser";
import { getFavorites } from "@/services/properties.service";
import type { User } from "@/types/User";


// Mock du contexte utilisateur
vi.mock("@/contexts/useUser", () => ({
    useUser: vi.fn(),
}));


// Mock du service favoris
vi.mock("@/services/properties.service", () => ({
    getFavorites: vi.fn(),
}));


// Mock de la grille des logements
vi.mock("@/components/grid/SixGrid", () => ({
    SixGrid: ({
                  properties,
              }: {
        properties: { id: string; title: string }[];
    }) => (
        <div data-testid="favorites-grid">
            {properties.map((property) => (
                <div key={property.id}>
                    {property.title}
                </div>
            ))}
        </div>
    ),
}));


// Mock du loader
vi.mock("@/components/input/LoadingSpinner", () => ({
    LoadingSpinner: ({
                         children,
                     }: {
        children: React.ReactNode;
    }) => (
        <>
            {children}
        </>
    ),
}));


describe("Favorites page", () => {


    beforeEach(() => {
        vi.clearAllMocks();
    });


    it("displays the favorites title", () => {

        vi.mocked(useUser).mockReturnValue({
            user: null,
            setUser: vi.fn(),
            loadingUser: false,
        });


        render(
            <Favorites />
        );


        expect(
            screen.getByText("Vos favoris")
        ).toBeInTheDocument();

    });



    it("loads and displays user favorites", async () => {

        const user: User = {
            id: 1,
            name: "Test User",
            role: "client",
        };


        vi.mocked(useUser).mockReturnValue({
            user,
            setUser: vi.fn(),
            loadingUser: false,
        });


        vi.mocked(getFavorites).mockResolvedValue({
            json: async () => [
                {
                    id: "property-1",
                    title: "Appartement test",
                },
            ],
        } as Response);



        render(
            <Favorites />
        );


        await waitFor(() => {

            expect(
                getFavorites
            ).toHaveBeenCalledWith(1);

        });


        expect(
            screen.getByText("Appartement test")
        ).toBeInTheDocument();

    });



    it("does not request favorites when user is not connected", async () => {

        vi.mocked(useUser).mockReturnValue({
            user: null,
            setUser: vi.fn(),
            loadingUser: false,
        });


        render(
            <Favorites />
        );


        await waitFor(() => {

            expect(
                getFavorites
            ).not.toHaveBeenCalled();

        });

    });

});