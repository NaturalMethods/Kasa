import Link from "next/link";


interface InputCheckBoxProps {

    text: string;
    linktext: string;
    link: string;
    checked?: boolean;
    setChecked?: (checked: boolean) => void;
    error?: boolean;
}

export function InputCheckBox({text, linktext, link,checked, setChecked, error}: InputCheckBoxProps) {


    return(

        <div className="flex flex-row gap-2">
            <input
                type="checkbox"
                checked={checked}
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