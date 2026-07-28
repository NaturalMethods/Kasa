"use client"

import { InputCheckBox } from "@/components/input/InputCheckBox";

interface EquipmentsFormProps {
    selectedEquipments: string[];
    setSelectedEquipments: (equipments: string[]) => void;
}

export function EquipmentsForm({
                                   selectedEquipments,
                                   setSelectedEquipments,
                               }: EquipmentsFormProps) {

    const equipments = [
        "Micro-ondes",
        "Clic-clac",
        "Douche italienne",
        "Four",
        "Frigo",
        "Rangements",
        "WIFI",
        "Lit",
        "Parking",
        "Bouilloire",
        "Sèche cheveux",
        "SDB",
        "Machine à laver",
        "Toilettes sèches",
        "Cuisine équipée",
        "Cintres",
        "Télévision",
        "Baie vitrée",
        "Chambre Séparée",
        "Hotte",
        "Climatisation",
        "Baignoire",
        "Frigo Américain",
        "Vue Parc",
    ];


    function toggleEquipment(equipment: string) {

        if (selectedEquipments.includes(equipment)) {

            setSelectedEquipments(
                selectedEquipments.filter(
                    (item) => item !== equipment
                )
            );

        } else {

            setSelectedEquipments([
                ...selectedEquipments,
                equipment,
            ]);

        }

    }


    return (
        <div className={"flex flex-col lg:min-w-130 lg:p-20 p-4 bg-white rounded-[10px] gap-4"}>

            <h4>Équipements</h4>

            <div className="grid grid-cols-2 gap-y-2 gap-x-8">

                {equipments.map((equipment) => (

                    <InputCheckBox
                        key={equipment}
                        text={equipment}
                        linktext=""
                        link=""
                        checked={selectedEquipments.includes(equipment)}
                        onClick={() => toggleEquipment(equipment)}
                    />

                ))}

            </div>

        </div>
    );
}