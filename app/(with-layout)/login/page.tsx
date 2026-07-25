import {MainRedButton} from "@/components/input/MainRedButton";
import Link from "next/link";


export const metadata = {
    title: "Connexion",
};

export default function Login() {

return(

    <form className={"lg:w-185.5 mr-4 ml-4 pt-8 pb-8 sm:p-20 w-fit mt-10 bg-white gap-9.5 rounded-[10px] flex flex-col items-center justify-center border border-lightGrey  "}>
        <div className="flex flex-col items-center justify-center p-2">
            <h2 className={"text-mainRed text-[24px] sm:text-[32px]"}>Heureux de vous revoir</h2>
            <p className={"text-[14px] text-center max-w-97.5"}>Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="email"
                    className="font-inter text-[14px] font-medium"
                >
                    Adresse email
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder=""
                    className="w-81.5 sm:w-90 h-10 rounded-sm px-2.5 border border-lightGrey bg-white"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="password"
                    className="font-inter text-[14px] font-medium"
                >
                    Mot de passe
                </label>

                <input
                    id="password"
                    type="password"
                    placeholder=""
                    className="w-81.5 sm:w-90 h-10 rounded-sm px-2.5 border border-lightGrey bg-white"
                />
            </div>

        </div>

        <div className="flex flex-col items-center justify-center gap-6">

            <MainRedButton width={230} height={36}>
                Se connecter
            </MainRedButton>
            <div className="flex flex-col items-center justify-center gap-3">
                <p className={"text-mainRed text-center"}>Mot de passe oublié</p>
                <Link href="/signin">
                    <p className={"text-mainRed text-center"}>Pas encore de compte ?  <span className={"font-medium"} > Inscrivez-vous </span></p>
                </Link>
            </div>

        </div>

    </form>

)

}
