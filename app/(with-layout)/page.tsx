"use client"

import Image from "next/image";
import {SixGrid} from "@/components/grid/SixGrid";
import {getFavorites, getProperties} from "@/services/properties.service";
import {PropertyBase} from "@/types/Property";
import {useEffect, useState} from "react";
import {MainRedCard} from "@/components/card/MainRedCard";
import {LoadingSpinner} from "@/components/input/LoadingSpinner";
import {useUser} from "@/contexts/useUser";

export default function Home() {

    const {user} = useUser()

    const [properties, setProperties] = useState<PropertyBase[]>([]);
    const [favorites, setFavorites] = useState<PropertyBase[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getListOfProperties() {
            setLoading(true);

            try {
                const response = await getProperties();
                const data = await response.json();

                setProperties(data);

                // TODO Ajouter une route pour récupérer le user depuis token
                if(!user?.id) console.log("undef user?",user?.id);

                if(!user?.id) return
                const favResponse = await getFavorites(user?.id);
                const favData = await favResponse.json();

                setFavorites(favData);

            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }

        getListOfProperties();
    }, []);

  return (

      <section className="max-w-278.75 lg:pl-1 lg:pr-1 pt-10 pl-4 pr-4 flex flex-col gap-10 pb-10 ">
          <div className="w-full flex flex-col gap-10 md:pl-0 md:pr-0 pl-3 pr-3 ">
              <div className="md:pl-45 md:pr-45 flex flex-col gap-2 items-center justify-center ">
                  <h2 className={"text-mainRed text-center"}>Chez vous, partout et ailleurs</h2>
                  <p className={"text-center"}>Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.</p>
              </div>
              <div className="relative w-full h-114.5 overflow-hidden rounded-[20px]">
                  <Image
                      src="/home/homeheader.svg"
                      fill
                      alt="Image de maison en bois dans une plaine"
                      className="object-cover"
                  />
              </div>
          </div>
          <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  loading ? "max-h-20" : "max-h-fit"
              }`}
          >
              {loading ? (
                 <LoadingSpinner />
              ) : (
                  <div className="flex flex-col gap-10">
                      <SixGrid properties={properties.slice(0, 6)} favorites={favorites} />
                      <SixGrid properties={properties.slice(6, 12)} />
                  </div>
              )}
          </div>

          <div className="bg-white flex flex-col gap-10 items-center justify-center rounded-[10px] pt-10 lg:p-10 pl-2 pr-2">
              <div className="flex flex-col gap-4">
                  <h2 className={"text-black font-semibold text-[24px]"}>Comment ça marche ?</h2>
                  <p className={"text-center whitespace-pre-line"}>{"Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,\n Kasa vous aide à trouver un lieu qui vous ressemble."}</p>
              </div>

              <div className={"flex lg:flex-row flex-col gap-4"}>
                  <MainRedCard title={"Recherchez"} description={`Entrez votre destination, vos dates et \n laissez Kasa faire le reste`}/>
                  <MainRedCard title={"Réservez"} description={`Profitez d’une plateforme sécurisée \n et de profils d’hôtes vérifiés.`}/>
                  <MainRedCard title={"Vivez l'expérience"} description={`Installez-vous, profitez de votre séjour, \n et sentez-vous chez vous, partout.`}/>
              </div>

          </div>

      </section>

  )
}
