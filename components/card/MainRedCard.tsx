interface MainRedCardProps {

    title: string
    description: string
}

/**
 * Card with dark orange background color
 * @param param0
 * @param param0.title
 * @param param0.description
 * @constructor
 */
export function MainRedCard({title, description}: MainRedCardProps) {

    return (

        <div className={"bg-darkOrange w-67.5 h-50 flex flex-col pt-11 pb-11 pl-5.5 pr-5.5 gap-4 rounded-[10px]"}>
            <h3 className={"text-white font-medium"}>{title}</h3>
            <p className={"text-center text-[12px] whitespace-pre-line text-white"}>{description}</p>
        </div>

    )

}