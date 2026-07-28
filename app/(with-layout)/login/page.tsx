"use client"
import {MainRedButton} from "@/components/input/MainRedButton";
import Link from "next/link";
import {validateLoginForm} from "@/utils/validation";
import {login} from "@/services/auth.service";
import {useState} from "react";
import {useUser} from "@/contexts/useUser";
import {useRouter} from "next/navigation";
import {InputField} from "@/components/input/InputField";


export default function Login() {

    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {setUser} = useUser()

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isLoading) {
            return
        }

        setLoginError("");
        setErrors({});

        const data = {
            email,
            password,
        };

        const validation = validateLoginForm(data);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setIsLoading(true)

        try {
            const res = await login(email, password);

            switch (res.status) {
                case 400:
                    setLoginError("Champs manquant");
                    return;

                case 401:
                    setLoginError("Identifiants incorrectes");
                    return;
            }

            if (!res.ok) {
                setLoginError("Une erreur est survenue.");
                return;
            }

            const resjson = await res.json();

            setUser({
                id: resjson.user.id,
                name: resjson.user.firstName,
                email: resjson.user.email,
                role: resjson.user.role,
            })

            router.push("/")
            router.refresh()

        }catch(err) {
            console.log(err);
        }finally{
            setIsLoading(false)
        }

    }

return(

    <form className={"lg:w-185.5 mr-4 ml-4 pt-8 pb-8 sm:p-20 w-fit mt-10 bg-white gap-9.5 rounded-[10px] flex flex-col items-center justify-center border border-lightGrey"}
          onSubmit={handleSubmit}
    >
        <div className="flex flex-col items-center justify-center p-2">
            <h2 className={"text-mainRed text-[24px] sm:text-[32px]"}>Heureux de vous revoir</h2>
            <p className={"text-[14px] text-center max-w-97.5"}>Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5">
            <InputField name={"Addresse email"} id={"email"} type="email" value={email} setValue={setEmail} error={!!errors.email} />
            <InputField name={"Mot de passe"} id={"password"} type="password"  value={password} setValue={setPassword} error={!!errors.password} />

        </div>

        <div className="flex flex-col items-center justify-center gap-6">

            <MainRedButton width={230} height={36} type="submit" disabled={isLoading}>
                { isLoading ? "Connexion..." : "Se connecter" }
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
