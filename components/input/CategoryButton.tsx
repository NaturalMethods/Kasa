
interface CategoryButtonProps {

    text?: string;
    onClick?: () => void;
    active?: boolean;
}

export function CategoryButton({text,onClick,active}: CategoryButtonProps) {

    return(

        <button
            type="button"
            onClick={onClick}
            className={`w-fit pl-4 pr-4 h-9 items-center justify-center rounded-[10px] gap-2 cursor-pointer ${active ? "bg-mainRed text-white" : "bg-lightGrey text-darkGrey"} `}
        >
            <p className="font-medium">
                {text}
            </p>
        </button>

    )

}