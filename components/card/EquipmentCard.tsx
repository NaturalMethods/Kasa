import {JSX} from "react";


interface EquipmentCardProps {

    text: string;

}

/**
 * Card with light-gray background color to display an equipment
 * @param param0
 * @param param0.text
 * @constructor
 */
export function EquipmentCard({text}: EquipmentCardProps): JSX.Element {

    return (

        <div className={"flex flex-col items-center justify-center w-25 h-8.25 pt-2 pb-2 bg-lightGrey rounded-[5px]"}>
            <p className={"text-[12px] text-center text-darkGrey"}>{text}</p>
        </div>

    )

}