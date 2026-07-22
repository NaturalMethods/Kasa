import {MainRedButton} from "@/components/input/MainRedButton";


export const metadata = {
    title: "Connexion",
};

export default function Login() {

return(

    <form className={"lg:max-w-185.5 ml-44 mr-44 mt-10 pt-10 bg-white gap-9.5 rounded-[10px] flex flex-col items-center justify-center border-lightGrey"}>
        <div className="flex flex-col items-center justify-center p-2">
            <h2 className={"text-mainRed"}>Heureux de vous revoir</h2>
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
                    className="w-[360px] h-[40px] rounded-[4px] px-[10px] border border-lightGrey bg-white"
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
                    className="w-[360px] h-[40px] rounded-[4px] px-[10px] border border-lightGrey bg-white"
                />
            </div>

        </div>

        <div className="flex flex-col items-center justify-center gap-6">

            <MainRedButton width={230} height={36}>
                Se connecter
            </MainRedButton>
            <div className="flex flex-col items-center justify-center gap-3">
                <p className={"text-mainRed text-center"}>Mot de passe oublié</p>

                <p className={"text-mainRed text-center"}>Pas encore de compte ? Inscrivez-vous</p>
            </div>

        </div>

    </form>

)

}
