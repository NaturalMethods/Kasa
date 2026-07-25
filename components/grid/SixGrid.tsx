import {PropertyCard} from "@/components/card/PropertyCard";


export function SixGrid() {

    return(

        <section className={"grid grid-cols-3 gap-6"}>

            <PropertyCard></PropertyCard>
            <PropertyCard></PropertyCard>
            <PropertyCard></PropertyCard>
            <PropertyCard></PropertyCard>
            <PropertyCard></PropertyCard>
            <PropertyCard></PropertyCard>

        </section>

    )

}