"use client"

import {MainRedButton} from "@/components/input/MainRedButton";
import {useState} from "react";
import Link from "next/link";
import {InputField} from "@/components/input/InputField";
import {InputCheckBox} from "@/components/input/InputCheckBox";
import {validateRegisterForm} from "@/utils/validation";
import {register} from "@/services/auth.service";
import {useRouter} from "next/navigation";
import {useUser} from "@/contexts/useUser";


/**
 * Content of the sign-in page
 * @constructor
 */
export default function Signin() {

    const router = useRouter()

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);

    const [registerError, setRegisterError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {setUser} = useUser()

    /**
     * Store which field is in error
     */
    const [errors, setErrors] = useState<{
        lastname?: string;
        firstname?: string;
        email?: string;
        password?: string;
        acceptedTerms?: string;
    }>({});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isLoading) {
            return
        }

        setRegisterError("");
        setErrors({});

        const data = {
            lastname,
            firstname,
            email,
            password,
            acceptedTerms: checked,
        };


        const validation = validateRegisterForm(data);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }


        setIsLoading(true)

        /**
         * Try to register the new user with datas from the form and get the response from the server
         */
        try {
            const res = await register(lastname, firstname, email, password);

            switch (res.status) {
                case 400:
                    setRegisterError("Informations incorrectes");
                    return;

                case 409:
                    setRegisterError("Email déjà enregistré");
                    return;
            }

            if (!res.ok) {
                setRegisterError("Une erreur est survenue.");
                return;
            }

            const resjson = await res.json();

            /**
             * Set the user in the context and redirect to home (/)
             */
            setUser({
                id: resjson.user.id,
                name: resjson.user.firstName,
                email: resjson.user.email,
                role: resjson.user.role,
            })

            router.push("/")
            router.refresh()


        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }

    return (

        <form
            className={"lg:w-185.5 mr-4 ml-4 mb-10 pt-8 pb-8 sm:p-20 w-fit mt-10 bg-white gap-9.5 rounded-[10px] flex flex-col items-center justify-center border border-lightGrey  "}
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center justify-center p-2">
                <h2 className={"text-mainRed text-[24px] sm:text-[32px]"}>Rejoignez la communauté Kasa</h2>
                <p className={"text-[14px] text-center max-w-122"}>Créez votre compte et commencez à voyager autrement :
                    réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux
                    avec d’autres voyageurs.</p>
            </div>


            <div className="flex flex-col items-center justify-center gap-5">

                <InputField name={"Nom"} id={"lastname"} value={lastname} setValue={setLastname}
                            error={!!errors.lastname}/>
                <InputField name={"Prénom"} id={"firstname"} value={firstname} setValue={setFirstname}
                            error={!!errors.firstname}/>
                <InputField name={"Adresse email"} id={"email"} type="email" value={email} setValue={setEmail}
                            error={!!errors.email}/>
                <InputField name={"Mot de passe"} id={"password"} type="password" value={password}
                            setValue={setPassword} error={!!errors.password}/>

                {registerError && (
                    <p className="font-bold text-red-500">
                        {registerError}
                    </p>
                )}
            </div>

            <div className="flex flex-col items-center justify-center gap-6">

                <InputCheckBox text={"J'accepte les"} linkText={"conditions générales d'utilisation"} link={"/signin"}
                               checked={checked} setChecked={setChecked} error={!!errors.acceptedTerms}/>
                <MainRedButton width={230} height={36} type="submit"
                               disabled={isLoading}>{isLoading ? "Inscription..." : "S'inscrire"}</MainRedButton>

                <div className="flex flex-col items-center justify-center gap-3">
                    <Link href="/login">
                        <p className={"text-mainRed text-center"}>Déjà membre ? <span className={"font-medium"}> Se connecter </span>
                        </p>
                    </Link>

                </div>

            </div>

        </form>

    )

}
