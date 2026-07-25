

interface MainRedButtonProps {

    width: number;
    height: number;
    type?: "button" | "submit"
    children?: React.ReactNode;
    disabled?: boolean;
}

export function MainRedButton({width, height,type,children, disabled}: MainRedButtonProps) {


    return(

        <button className={`bg-mainRed text-white font-inter text-[14px] rounded-[10px] px-8 py-2 flex items-center justify-center gap-2.5`}
                type={type}
                disabled={disabled}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                }}
        >
            {children}
        </button>

    )

}