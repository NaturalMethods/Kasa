"use client"

import {useRef, useState} from "react";
import { MainRedButton } from "@/components/input/MainRedButton";
import { InputField } from "@/components/input/InputField";

interface InputPicProps {
    name: string;
    id: string;
    setFile: (file: File) => void;
    error?: boolean;
}

export function InputPic({
                             name,
                             id,
                             setFile,
                             error,
                         }: InputPicProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState("");


    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {

        const file = e.target.files?.[0];

        if (!file) return;

        // Affichage dans l'input
        setValue(file.name);

        // Stockage du vrai fichier
        setFile(file);
    }


    return (
        <div className="flex flex-row items-baseline-last justify-center gap-2">

            <input
                ref={fileInputRef}
                id={id}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <InputField
                name={name}
                id={id}
                value={value}
                setValue={setValue}
                readOnly={true}
                error={error}
                className={"w-full"}
            />

            <MainRedButton
                type="button"
                width={38}
                height={38}
                className="pl-4.5 pr-4.5 pt-2.25 pb-2.25"
                onClick={() => fileInputRef.current?.click()}
            >
                +
            </MainRedButton>

        </div>
    );
}