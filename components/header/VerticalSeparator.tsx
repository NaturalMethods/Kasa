import Image from "next/image";

/**
 * Vertical line visible between icon in the header
 * @constructor
 */
export function VerticalSeparator() {

    return (
        <div className="flex items-center">
            <Image
                src="/icons/VerticalLine.svg"
                width={5}
                height={5}
                alt=""
                aria-hidden="true"
                className="h-1.25 w-1.25"
            />
        </div>
    )

}