import Link from "next/link";
import {useId} from "react";

interface InputCheckBoxProps {
    text: string;
    linkText: string;
    link: string;
    checked?: boolean;
    setChecked?: (checked: boolean) => void;
    error?: boolean;
    onClick?: () => void;
}

/**
 * Custom checkbox for EquipmentsForm
 * @param param0
 * @param param0.text
 * @param param0.linkText
 * @param param0.link
 * @param param0.checked
 * @param param0.setChecked
 * @param param0.error
 * @param param0.onClick
 * @constructor
 */
export function InputCheckBox({
                                  text,
                                  linkText,
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
                {linkText &&
                    <Link
                        href={link}
                        className="pl-1 underline"
                    >
                        {linkText}
                    </Link>
                }
            </label>
        </div>
    );
}