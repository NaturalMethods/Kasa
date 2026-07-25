import Image from "next/image";


export function PropertyCard(){

    return(

        <div className="max-w-88.75 bg-white rounded-[20px]">
            <div className="relative w-88.75 h-94 overflow-hidden rounded-t-[20px] ">
                <Image
                    src="/home/homeheader.svg"
                    fill
                    alt="Image de maison en bois entouré d'arbres"
                    className="object-cover"
                />
            </div>
            <div className="w-88.75 h-44 flex flex-col pt-4 pb-6 pr-6 pl-6 justify-between">
                <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Appartement cosy</h3>
                    <p className={"text-darkGrey"}>Ile de France - Paris 17e</p>
                </div>
                <p className={"text-darkGrey"}><span className={"text-black font-medium"}>100€</span> par nuit</p>
            </div>

        </div>

    )

}