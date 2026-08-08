import {User} from "@/types/User";
import {formatMessageTime} from "@/utils/utils";


interface ThumbnailProps {

    picUrl?: string;
    user?: User;
    lastMessage?: string;
    date?: string;
    selected?: boolean;
    onClick?: () => void;
}


export function Thumbnail({
                              picUrl,
                              user,
                              lastMessage,
                              date,
                              selected = false,
                              onClick,
                          }: ThumbnailProps) {


    return (

        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            aria-label={`Conversation avec ${user?.name ?? "Utilisateur"}`}
            className={`
                box-border 
                flex flex-col 
                items-start 
                pt-2 
                pb-2 
                gap-2.5 
                lg:w-90 
                h-15.25 
                ${selected ? "bg-lightOrange" : "bg-white"} 
                border-b 
                border-lightGrey
                cursor-pointer
                text-left
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-mainRed
            `}
        >

            <div className="w-full flex flex-row pl-2.5 justify-between pr-2.5">

                <div className="flex flex-row gap-5">

                    {/* TODO Ajouter la photo du user */}
                    <div
                        className="w-11.25 h-11.25 bg-lightGrey shrink-0"
                        aria-hidden="true"
                    >
                        Photo
                    </div>


                    <div className="flex flex-col gap-1">

                        <h4>
                            {user?.name ?? "Utilisateur"}
                        </h4>

                        <span className="font-inter text-[10px] font-normal text-darkGrey">
                            {lastMessage ?? ""}
                        </span>

                    </div>

                </div>


                <div className="flex flex-col justify-between">

                    <span className="font-inter text-[10px] font-normal text-darkGrey whitespace-nowrap">
                        {date ? formatMessageTime(date) : ""}
                    </span>

                </div>


            </div>

        </button>

    );
}