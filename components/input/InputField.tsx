

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
}

export function InputField({name,id,type,placeholder="",value,setValue,error = false,className, readOnly}: InputFieldProps) {

    return(

        <div className={`flex flex-col gap-1 ${className}`}>
            <label
                htmlFor={id}
                className="font-inter text-[14px] font-medium"
            >
                {name}
            </label>

            <input
                id={id}
                type={type}
                readOnly={readOnly}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue?.(e.target.value)}
                className={`w-81.5 sm:w-90 h-10 rounded-sm px-2.5 border bg-white ${error ? "border-red-500 border-2" : "border-lightGrey"} ${className}`}
            />
        </div>

    )

}