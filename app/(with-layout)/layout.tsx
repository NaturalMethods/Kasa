import React from "react"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        default: "Kasa",
        template: "%s | Kasa",
    },
    description: "Location de logements entre particuliers.",
};

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full bg-lightOrange sm:pt-10 min-h-screen flex flex-col items-center justify-cente">



            <main className="flex-1 flex flex-col">
                {children}
            </main>

        </div>
    )
}