"use client"

import {SixGrid} from "@/components/grid/SixGrid";
import {useEffect, useState} from "react";
import {PropertyBase} from "@/types/Property";
import {getFavorites} from "@/services/properties.service";
import {useUser} from "@/contexts/useUser";


export default function Favorites(){

    const {user} = useUser()

    const [favorites, setFavorites] = useState<PropertyBase[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getListOfFavorites() {
            setLoading(true);

            console.log("getListOfFavorites:",user?.id);

            if(!user?.id) return
            try {
                const response = await getFavorites(user?.id);
                const data = await response.json();

                setFavorites(data);
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }

        getListOfFavorites();
    }, []);

    useEffect(() => {

        console.log("Favorites:",favorites);
    },[favorites]);

    //TODO Loading pendant le chargement des favoris

    return(

        <section className={" max-w-278.75 pt-10 pb-10 pl-4 pr-4 lg:pl-0 lg:pr-0 flex flex-col gap-6"}>

            <div className={"flex flex-col gap-2"}>
                <h2 className={"text-mainRed"}>Vos favoris</h2>
                <p className={"text-center whitespace-pre-line"}>{`Retrouvez ici tous les logements que vous avez aimés.
                    Prêts à réserver ? Un simple clic et votre prochain séjour est en route.`}</p>
            </div>

            <SixGrid properties={favorites} favorites={favorites} />

        </section>

    )

}