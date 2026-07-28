"use client"

import { useState } from "react";
import { CategoryButton } from "@/components/input/CategoryButton";
import { InputField } from "@/components/input/InputField";
import { MainRedButton } from "@/components/input/MainRedButton";

interface CategoriesFormProps {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}

export function CategoriesForm({
                                   selectedCategories,
                                   setSelectedCategories,
                               }: CategoriesFormProps) {

    const [categories, setCategories] = useState([
        "Parc",
        "Night Life",
        "Culture",
        "Nature",
        "Touristique",
        "Vue sur mer",
        "Pour les couples",
        "Famille",
        "Forêt",
    ]);

    const [newCategory, setNewCategory] = useState("");


    function toggleCategory(category: string) {

        if (selectedCategories.includes(category)) {

            setSelectedCategories(
                selectedCategories.filter(
                    (item) => item !== category
                )
            );

        } else {

            setSelectedCategories([
                ...selectedCategories,
                category,
            ]);

        }
    }


    function addCategory() {

        const category = newCategory.trim();

        if (!category) return;

        if (categories.includes(category)) {
            return;
        }

        setCategories([
            ...categories,
            category,
        ]);

        setNewCategory("");
    }


    return (
        <div className="flex flex-col h-fit lg:p-20 p-4 bg-white rounded-[10px] gap-4">

            <h4>Catégories</h4>

            <div className="flex flex-wrap max-w-104 gap-1">

                {categories.map((categorie) => (

                    <CategoryButton
                        key={categorie}
                        text={categorie}
                        active={selectedCategories.includes(categorie)}
                        onClick={() => toggleCategory(categorie)}
                    />

                ))}

            </div>


            <h4>Ajouter une catégorie personnalisée</h4>

            <div className="flex flex-row items-baseline-last gap-2">

                <InputField
                    name=""
                    id="newTag"
                    value={newCategory}
                    setValue={setNewCategory}
                    placeholder="Nouveau tag"
                    className="w-full"
                />

                <MainRedButton
                    type="button"
                    width={38}
                    height={38}
                    onClick={addCategory}
                >
                    +
                </MainRedButton>

            </div>

        </div>
    );
}