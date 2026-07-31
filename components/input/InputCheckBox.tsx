import Link from "next/link";
import { useId } from "react";

interface InputCheckBoxProps {
    text: string;
    linktext: string;
    link: string;
    checked?: boolean;
    setChecked?: (checked: boolean) => void;
    error?: boolean;
    onClick?: () => void;
}

export function InputCheckBox({
                                  text,
                                  linktext,
                                  link,
                                  checked,
                                  setChecked,
                                  error,
                                  onClick
                              }: InputCheckBoxProps) {

    const checkboxId = useId();

    return (
        <div className="flex flex-row gap-2">
            <input
                id={checkboxId}
                type="checkbox"
                checked={checked}
                onClick={onClick}
                onChange={(e) => setChecked?.(e.target.checked)}
            />

            <label
                htmlFor={checkboxId}
                className={`text-[12px] ${error ? "text-red-500 font-bold" : "text-darkGrey"}`}
            >
                {text}
                {linktext &&
                <Link
                    href={link}
                    className="pl-1 underline"
                >
                    {linktext}
                </Link>
                }
            </label>
        </div>
    );
}