interface MainRedButtonProps {

    width: number;
    height: number;
    type?: "button" | "submit"
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

/**
 * Main red button
 * @param param0
 * @param param0.width
 * @param param0.height
 * @param param0.type
 * @param param0.children
 * @param param0.disabled
 * @param param0.className
 * @param param0.onClick
 * @constructor
 */
export function MainRedButton({width, height, type, children, disabled, className, onClick}: MainRedButtonProps) {


    return (

        <button
            className={`bg-mainRed text-white font-inter text-[14px] rounded-[10px] px-8 py-2 flex items-center justify-center gap-2.5 ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            {children}
        </button>

    )

}