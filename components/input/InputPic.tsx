"use client"

import React, {useRef, useState} from "react";
import {MainRedButton} from "@/components/input/MainRedButton";
import {InputField} from "@/components/input/InputField";

interface InputPicProps {
    name: string;
    id: string;
    setFile: (file: File) => void;
    error?: boolean;
}

/**
 * Field that display the name of an image that is selected to be uploaded
 * @param param0
 * @param param0.name
 * @param param0.id
 * @param param0.setFile
 * @param param0.error
 * @constructor
 */
export function InputPic({
                             name,
                             id,
                             setFile,
                             error,
                         }: InputPicProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState("");

    const fileId = `${id}-file`;

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        setValue(file.name);
        setFile(file);
    }

    return (
        <div className="flex flex-row items-baseline-last gap-2">

            <input
                ref={fileInputRef}
                id={fileId}
                type="file"
                accept="image/*"
                className="hidden"
                aria-label={name}
                onChange={handleFileChange}
            />
            <label
                htmlFor={fileId}
                className="sr-only"
            >Sélectionner {name}
            </label>

            <InputField
                name={name}
                id={id}
                value={value}
                setValue={setValue}
                readOnly
                error={error}
                className="w-full"
            />

            <MainRedButton
                type="button"
                aria-label={`Ajouter ${name}`}
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