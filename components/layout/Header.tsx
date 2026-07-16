import Image from "next/image";
import Link from "next/link";


export default function Header(){

    return(
        <div className={"w-full flex items-center justify-center"}>
            <div className={" shadow-[0px_4px_4px_rgba(182,182,182,0.05)] rounded-[10px] bg-white w-fit flex flex-row h-14 sm:pl-25 sm:pr-25 pl-5 pr-5 items-center justify-center gap-8 "}>
                <div className={"flex flex-row gap-7  "}>
                    <Link className="font-inter text-[14px] font-normal" href="/">Acceuil</Link>
                    <Link className="font-inter text-[14px] font-normal" href="/about">À propos</Link>
                </div>
                <Image
                    src={"/icons/Logo.svg"}
                    width={"114"}
                    height={"40"}
                    alt={"Kasa logo"}
                    className={"sm:h-[40] sm:w-[114]"}
                />

                <div className={"flex flex-row gap-7 items-center "}>
                    <Link className="font-inter text-[14px] font-normal text-mainRed" href="/">+Ajouter un logement</Link>

                    <div className={"flex flex-row gap-2"}>
                        <Link href="/about">
                            <Image
                                src={"/icons/Heart.svg"}
                                width={"10"}
                                height={"10"}
                                alt={"Heart logo"}
                                className={"sm:h-[10] sm:w-[10]"}
                            />
                        </Link>

                        <Link className={" flex items-center"} href="/about">
                            <Image
                                src={"/icons/VerticalLine.svg"}
                                width={"5"}
                                height={"5"}
                                alt={"Heart logo"}
                                className={"sm:h-[5] sm:w-[5]"}
                            />
                        </Link>

                        <Link href="/about">
                            <Image
                                src={"/icons/Message.svg"}
                                width={"10"}
                                height={"10"}
                                alt={"Heart logo"}
                                className={"sm:h-[10] sm:w-[10]"}
                            />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )

}