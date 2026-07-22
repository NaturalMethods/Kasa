"use client"

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";


export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header
            className={`flex flex-col p-4 bg-white sm:bg-lightOrange w-full transition-all duration-300 ease-in-out overflow-hidden ${
                isMenuOpen ? "h-screen" : "h-21.25"
            } sm:h-21.25 sm:flex-row sm:items-center sm:justify-center`}
        >

            <div className={"flex flex-col gap-10"}>
                <div className="flex w-full flex-row justify-between sm:hidden">

                    <Image
                        src="/icons/kasa.svg"
                        width={46}
                        height={53}
                        alt="Kasa logo"
                        className="h-[53px] w-[46px]"
                    />

                    <button
                        type="button"
                        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="cursor-pointer h-[45px] w-[45px]"
                    >
                        <Image
                            src={isMenuOpen ? "/icons/MobileCross.svg" : "/icons/MobileMenu.svg"}
                            width={45}
                            height={45}
                            alt=""
                        />
                    </button>

                </div>


                <nav
                    className={`flex flex-1 flex-col  gap-7 transition-opacity duration-300 sm:hidden ${
                        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >

                    <Link
                        className="font-inter text-[24px] font-normal"
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Accueil
                    </Link>
                    <hr className="border-lightGrey" />
                    <Link
                        className="font-inter text-[24px] font-normal"
                        href="/about"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        À propos
                    </Link>
                    <hr className="border-lightGrey" />
                    <Link
                        className="font-inter text-[24px] font-normal"
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Messagerie
                    </Link>
                    <hr className="border-lightGrey" />
                    <Link
                        className="font-inter text-[24px] font-normal"
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Favoris
                    </Link>



                </nav>
                <button className="sm:hidden bg-mainRed text-white font-inter text-[14px] w-50 h-9 rounded-[10px] px-8 py-2 flex items-center justify-center gap-2.5">
                    Ajouter un logement
                </button>
            </div>

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
                    className="h-[40px] w-[114px]"
                />


                <div className="flex flex-row gap-7 items-center">

                    <Link
                        className="font-inter text-[14px] font-normal text-mainRed"
                        href="/"
                    >
                        +Ajouter un logement
                    </Link>


                    <div className="flex flex-row gap-2">

                        <Link href="/about">
                            <Image
                                src="/icons/Heart.svg"
                                width={10}
                                height={10}
                                alt="Heart logo"
                                className="h-[10px] w-[10px]"
                            />
                        </Link>


                        <Link
                            className="flex items-center"
                            href="/about"
                        >
                            <Image
                                src="/icons/VerticalLine.svg"
                                width={5}
                                height={5}
                                alt="Vertical line"
                                className="h-[5px] w-[5px]"
                            />
                        </Link>


                        <Link href="/about">
                            <Image
                                src="/icons/Message.svg"
                                width={10}
                                height={10}
                                alt="Message logo"
                                className="h-[10px] w-[10px]"
                            />
                        </Link>

                    </div>

                </div>

            </div>

        </header>
    )

}