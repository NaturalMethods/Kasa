import React from "react";
import {MainRedButton} from "@/components/input/MainRedButton";

export default function NotFound() {
    return (
        <div className="w-full bg-lightOrange sm:pt-10 min-h-screen flex flex-col items-center justify-center">


            <main className="flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center w-85 h-85 gap-10">
                    <div className="flex flex-col  items-center justify-center">
                        <h1 className={"text-mainRed font-black"}>404</h1>
                        <p className={"text-center"}> Il semble que la page que vous cherchez ait pris des vacances... ou n&#39;ait jamais existé.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3.5">
                        <MainRedButton width={200} height={36}>Accueil</MainRedButton>
                        <MainRedButton width={200} height={36}>Logements</MainRedButton>

                    </div>
                </div>
            </main>

        </div>
    )
}