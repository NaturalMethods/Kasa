"use client"

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {logout} from "@/services/auth.service";
import {useRouter} from "next/navigation"
import {VerticalSeparator} from "@/components/header/VerticalSeparator";
import {MobileMenu} from "@/components/header/MobileMenu";

export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter()

    async function handleLogout() {

        await logout()

        router.push("/login")
        router.refresh()
    }

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        }

        if (isMenuOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen]);


    return (
        <header
            className={`flex flex-col p-4 bg-white sm:bg-lightOrange w-full transition-all duration-300 ease-in-out overflow-hidden ${
                isMenuOpen ? "h-screen" : "h-21.25"
            } sm:h-21.25 sm:flex-row sm:items-center sm:justify-center`}
        >

            <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <div
                className="hidden md:pl-25 md:pr-25 sm:flex sm:shadow-[0px_4px_4px_rgba(182,182,182,0.05)] sm:rounded-[10px] sm:bg-white lg:min-w-196.5 sm:w-fit sm:flex-row sm:h-14 sm:px-5 sm:items-center sm:justify-center sm:gap-8">

                <div className="flex flex-row gap-7">

                    <Link
                        className="font-inter text-[14px] font-normal"
                        href="/"
                    >
                        Accueil
                    </Link>

                    <Link
                        className="font-inter text-[14px] font-normal"
                        href="/about"
                    >
                        À propos
                    </Link>

                </div>


                <Image
                    src="/icons/Logo.svg"
                    width={114}
                    height={40}
                    alt="Kasa logo"
                    className="h-10 w-28.5"
                />


                <div className="flex flex-row gap-7 items-center">

                    <Link
                        className="font-inter text-[14px] font-normal text-mainRed"
                        href="/property/new"
                    >
                        +Ajouter un logement
                    </Link>


                    <div className="flex flex-row gap-2">

                        <Link href="/favorites" aria-label="Favoris">
                            <Image
                                src="/icons/Heart.svg"
                                width={10}
                                height={10}
                                alt=""
                                className="h-2.5 w-2.5"
                            />
                        </Link>


                        <VerticalSeparator/>


                        <Link href="/about" aria-label="Messagerie">
                            <Image
                                src="/icons/Message.svg"
                                width={10}
                                height={10}
                                alt=""
                                className="h-2.5 w-2.5"
                            />
                        </Link>

                        <VerticalSeparator/>

                        <button
                            type="button"
                            onClick={handleLogout}
                            aria-label="Se déconnecter"
                            className="cursor-pointer"
                        >
                            <Image
                                src="/icons/logout.svg"
                                width={10}
                                height={10}
                                alt=""
                                className="h-2.5 w-2.5"
                            />
                        </button>

                    </div>

                </div>

            </div>

        </header>
    )

}