import Image from "next/image";
import Link from "next/link";


interface ReturnButtonProps {

    text?: string;

}

export function ReturnButton({text}: ReturnButtonProps) {

    return(

        <Link
            href="/"
            className="flex flex-row w-47.25 h-9 items-center justify-center bg-lightGrey rounded-[10px] gap-2 cursor-pointer"
        >
            <Image
                src="/icons/LeftArrow.svg"
                width={8}
                height={8}
                alt=""
            />
            <p className="font-medium text-darkGrey">
                {text}
            </p>
        </Link>

    )

}