import Image from "next/image";

/**
 * Content of the footer
 * @constructor
 */
export default function Footer() {
    return (
        <div className={"w-full bg-white border-t border-lightGrey"}>
            <div className={"h-17.5 sm:ml-10 sm:mr-10 ml-5 mr-5 " +
                "flex flex-row items-center justify-between "
            }>
                <Image
                    src={"/icons/kasa.svg"}
                    width={"46"}
                    height={"53"}
                    alt={"Kasa logo"}
                    className={"sm:h-[53] sm:w-[46]"}
                />

                <p className={"font-inter text-[12px] whitespace-nowrap text-darkGrey "}>© 2020 Kasa. All rights
                    reserved</p>
            </div>
        </div>
    )

}