"use client";

import Image from "next/image";

interface MessageTextAreaProps {
    value: string;
    setValue: (value: string) => void;
    onSend: () => void;
}

/**
 * Text area to write and send a message
 * @param param0
 * @param param0.value
 * @param param0.setValue
 * @param param0.onSend
 * @constructor
 */
export function MessageTextArea({
                                    value,
                                    setValue,
                                    onSend,
                                }: MessageTextAreaProps) {

    return (
        <div className="relative w-full">

            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Envoyer un message"
                className="
                    w-full
                    h-24
                    resize-none
                    rounded-[10px]
                    border
                    border-lightGrey
                    bg-white
                    p-4
                    pr-12
                    text-sm
                    outline-none
                    placeholder:text-[#999999]
                "
            />

            <button
                type="button"
                aria-label="Envoyer le message"
                onClick={onSend}
                className="
                    absolute
                    bottom-3
                    right-3
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                "
            >
                <Image
                    src="/icons/Send.svg"
                    width={32}
                    height={32}
                    alt=""
                />
            </button>

        </div>
    );
}