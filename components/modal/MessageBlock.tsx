import Image from "next/image";
import {formatMessageTime} from "@/utils/utils";

interface MessageBlockProps {
    isSender: boolean;
    text: string;
    date: string;
}

export function MessageBlock({ isSender, text, date}: MessageBlockProps) {

    return (
        <div
            className={`
                flex
                flex-row
                w-1/2
                max-w-1/2
                gap-1.5
                ${isSender ? "ml-auto flex-row-reverse" : ""}
            `}
        >

            <div className="w-7 h-7 bg-darkGrey rounded-md shrink-0"></div>

            <div
                className={`
                    flex
                    flex-col
                    gap-2
                    max-w-full
                    ${isSender ? "items-end" : "items-start"}
                `}
            >

                <div className="flex flex-row gap-1">
                    <span className="font-inter text-[8px] font-normal text-darkGrey">
                        Utilisateur
                    </span>

                    <Image
                        src="/icons/DarkGreyRound.svg"
                        width={4}
                        height={4}
                        alt=""
                    />

                    <span className="font-inter text-[8px] font-normal text-darkGrey">
                        {date ? formatMessageTime(date) : ""}
                    </span>
                </div>


                <div
                    className={`
                        flex
                        flex-row
                        p-3
                        gap-2.5
                        ${isSender ? "bg-mainRed":"bg-white"}
                        box-border
                        border
                        border-lightGrey
                        ${isSender
                        ? "rounded-l-[20px] rounded-br-[20px]"
                        : "rounded-r-[20px] rounded-bl-[20px]"
                    }
                    `}
                >
                    <p className={`text-[14px] font-normal wrap-break-word ${isSender ? "text-white" : "text-black"}`}>
                        {text}
                    </p>
                </div>

            </div>

        </div>
    );
}