import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";

interface MobileMenuProps {
    isMenuOpen: boolean,
    setIsMenuOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

interface MobileLinkProps {
    text: string;
    toLink: string;
    setIsMenuOpen: (value: boolean) => void;
}

function MobileLogo() {
    return (
        <Link href="/" aria-label="Kasa - Accueil">
            <Image
                src="/icons/kasa.svg"
                width={46}
                height={53}
                alt=""
                className="h-13.25 w-11.5"
            />
        </Link>
    )
}

function CloseMenuButton({isMenuOpen, setIsMenuOpen}: MobileMenuProps) {

    return (
        <button
            type="button"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer h-11.25 w-11.25"
        >
            <Image
                src={isMenuOpen ? "/icons/MobileCross.svg" : "/icons/MobileMenu.svg"}
                width={45}
                height={45}
                alt=""
            />
        </button>
    )

}

function MobileLink({text, toLink, setIsMenuOpen}: MobileLinkProps) {

    return (
        <>
            <Link
                className="font-inter text-[24px] font-normal"
                href={toLink}
                onClick={() => setIsMenuOpen(false)}
            >
                {text}
            </Link>
        </>
    )

}

/**
 * Display the mobile menu
 * @param param0
 * @param param0.isMenuOpen
 * @param param0.setIsMenuOpen
 * @constructor
 */
export function MobileMenu({isMenuOpen, setIsMenuOpen}: MobileMenuProps) {

    const router = useRouter();

    return (
        <div className={"flex flex-col gap-10"}>
            <div className="flex w-full flex-row justify-between sm:hidden">
                <MobileLogo/>
                <CloseMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            </div>

            <nav
                id="mobile-navigation"
                aria-label="Navigation principale"
                inert={!isMenuOpen}
                className={`flex flex-1 flex-col gap-7 transition-opacity duration-300 sm:hidden ${
                    isMenuOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <MobileLink text={"Accueil"} toLink={"/"} setIsMenuOpen={setIsMenuOpen}/>
                <hr className="border-lightGrey"/>

                <MobileLink text={"À propos"} toLink={"/about"} setIsMenuOpen={setIsMenuOpen}/>
                <hr className="border-lightGrey"/>

                {/* TODO changer le lien du bouton Message dans le header */}
                <MobileLink text={"Messagerie"} toLink={"/about"} setIsMenuOpen={setIsMenuOpen}/>
                <hr className="border-lightGrey"/>

                <MobileLink text={"Favoris"} toLink={"/favorites"} setIsMenuOpen={setIsMenuOpen}/>

            </nav>
            <button
                type="button"
                inert={!isMenuOpen}
                onClick={() => router.push("/property/new")}
                className="sm:hidden bg-mainRed text-white font-inter text-[14px] w-50 h-9 rounded-[10px] px-8 py-2 flex items-center justify-center gap-2.5"
            >
                Ajouter un logement
            </button>
        </div>
    )

}