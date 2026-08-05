import Image from "next/image";

export const metadata = {
    title: "À propos",
};

/**
 * Content of the About page
 * @constructor
 */
export default function About() {

    return (

        <section className={"flex flex-col pl-6 pr-6 lg:pl-40 lg:pr-40 gap-10 pt-10 pb-10"}>

            <div className="flex flex-col max-w-278.75 gap-10">
                <div className="flex flex-col md:ml-45 md:mr-45 gap-2 ">
                    <h2 className={"text-mainRed"}>À propos</h2>
                    <p className={"text-center whitespace-pre-line"}>{`Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.

                        Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.
                        `}
                    </p>
                </div>
                <div className="relative w-full h-114.5 overflow-hidden rounded-[20px]">
                    <Image
                        src="/about/house1.png"
                        fill
                        alt="Image de maison en bois entouré d'arbres"
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-col max-w-278.75 md:flex-row gap-4">
                <div className="flex w-full flex-col justify-center">
                    <h3 className="text-mainRed">Notre mission est simple :</h3>

                    <div className="flex flex-col gap-4">
                        <p className="whitespace-pre-line">
                            {`1. Offrir une plateforme fiable et simple d’utilisation

2. Proposer des hébergements variés et de qualité

3. Favoriser des échanges humains et chaleureux entre hôtes et voyageurs`}
                        </p>

                        {/* Image affichée uniquement en mobile */}
                        <div className="relative block md:hidden w-full h-114.5 overflow-hidden rounded-[20px]">
                            <Image
                                src="/about/house2.png"
                                fill
                                alt="Image de maison avec des vitres transparentes et des lumières allumées"
                                className="object-cover"
                            />
                        </div>

                        <p className="text-body-medium text-mainRed">
                            Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un
                            chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir
                            inoubliable.
                        </p>
                    </div>
                </div>

                {/* Image affichée uniquement à partir de md */}
                <Image
                    src="/about/house2.png"
                    width={494}
                    height={458}
                    alt="Image de maison avec des vitres transparentes et des lumières allumées"
                    className="hidden md:block rounded-[20px]"
                />
            </div>

        </section>

    )

}