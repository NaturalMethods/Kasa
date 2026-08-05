interface InputFieldProps {

    name: string;
    id: string;
    type?: string;
    placeholder?: string;
    value?: string;
    setValue?: (value: string) => void;
    error?: boolean;
    className?: string;
    readOnly?: boolean;
    labelVisible?: boolean;
}

/**
 * Custom input field
 * @param param0
 * @param param0.name
 * @param param0.id
 * @param param0.type
 * @param param0.placeholder
 * @param param0.value
 * @param param0.setValue
 * @param param0.error
 * @param param0.className
 * @param param0.readOnly
 * @param param0.labelVisible
 * @constructor
 */
export function InputField({
                               name,
                               id,
                               type,
                               placeholder = "",
                               value,
                               setValue,
                               error = false,
                               className,
                               readOnly,
                               labelVisible = true
                           }: InputFieldProps) {

    return (

        <div className={`flex flex-col gap-1 ${className}`}>
            {labelVisible && <label
                htmlFor={id}
                className="font-inter text-[14px] font-medium"
            >
                {name}
            </label>}

            <input
                id={id}
                type={type}
                readOnly={readOnly}
                aria-label={name || placeholder}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue?.(e.target.value)}
                className={`w-81.5 sm:w-90 h-10 rounded-sm px-2.5 border bg-white ${error ? "border-red-500 border-2" : "border-lightGrey"} ${className}`}
            />
        </div>

    )

}