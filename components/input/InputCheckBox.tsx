import Link from "next/link";


interface InputCheckBoxProps {

    text: string;
    linktext: string;
    link: string;
    checked?: boolean;
    setChecked?: (checked: boolean) => void;
    error?: boolean;
    onClick?: () => void;
}

export function InputCheckBox({text, linktext, link,checked, setChecked, error, onClick}: InputCheckBoxProps) {


    return(

        <div className="flex flex-row gap-2">
            <input
                type="checkbox"
                checked={checked}
                onClick={onClick}
                onChange={(e) => setChecked ? setChecked(e.target.checked) :""}
            />
            <p className={`text-[12px]  ${error ? "text-red-500 font-bold" : "text-darkGrey"}`}>{text}
                <Link
                    href={link}
                    className="pl-1 underline">
                    {linktext}
                </Link>
            </p>
        </div>

    )

}