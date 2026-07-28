

interface InputAreaProps {

    name: string;
    id: string;
    placeholder?: string;
    value?: string;
    setValue?: (value: string) => void;
    error?: boolean;
    className?: string;
}

export function InputArea({name,id,placeholder="",value,setValue,error = false,className}: InputAreaProps) {

    return(

        <div className="flex flex-col gap-1">
            <label
                htmlFor={id}
                className="font-inter text-[14px] font-medium"
            >
                {name}
            </label>

            <textarea
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue?.(e.target.value) }
                className={`w-81.5 sm:w-90 h-10 pt-1 rounded-sm px-2.5 border bg-white ${error ? "border-red-500 border-2" : "border-lightGrey"} ${className}`}
            />
        </div>

    )

}