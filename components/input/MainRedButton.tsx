

interface MainRedButtonProps {

    width: number;
    height: number;
    children?: React.ReactNode;
}

export function MainRedButton({width, height, children}: MainRedButtonProps) {


    return(

        <button className={`bg-mainRed text-white font-inter text-[14px] w-[${width}] h-[${height}] rounded-[10px] px-8 py-2 flex items-center justify-center gap-2.5`}>
            {children}
        </button>

    )

}