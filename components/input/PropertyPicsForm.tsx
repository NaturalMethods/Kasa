import {InputPic} from "@/components/input/InputPic";

interface PropertyPicsFormProps {

    propertyCoverFile: File | null;
    setPropertyCoverFile: (file: File | null) => void;

    propertyPicturesFile: (File | null)[];
    setPropertyPicturesFile: (files: (File | null)[]) => void;

    errorCover?: boolean;
    errorPictures?: boolean;
}

/**
 * Form with multiplie input pic to get all images for a property
 * @param param0
 * @param param0.setPropertyCoverFile
 * @param param0.propertyPicturesFile
 * @param param0.setPropertyPicturesFile
 * @param param0.errorCover
 * @param param0.errorPictures
 * @constructor
 */
export function PropertyPicsForm({
                                     setPropertyCoverFile,
                                     propertyPicturesFile, setPropertyPicturesFile,
                                     errorCover = false, errorPictures = false
                                 }: PropertyPicsFormProps) {
    function addPictureField() {
        if (propertyPicturesFile.length < 4) {
            setPropertyPicturesFile([
                ...propertyPicturesFile,
                null
            ]);
        }
    }

    function updatePictureFile(index: number, file: File) {
        const newFiles = [...propertyPicturesFile];

        newFiles[index] = file;

        setPropertyPicturesFile(newFiles);
    }

    return (

        <div className={"flex flex-col lg:pb-12 lg:pt-12 lg:pl-20 lg:pr-20 p-4 bg-white rounded-[10px] gap-4"}>

            <InputPic
                name="Image de couverture"
                id="propertyCover"
                setFile={setPropertyCoverFile}
                error={errorCover}
            />


            {propertyPicturesFile.map((picture, index) => (
                <InputPic
                    key={index}
                    name="Image du logement"
                    id={`propertyPicture-${index}`}
                    setFile={(file) => updatePictureFile(index, file)}
                    error={errorPictures}
                />
            ))}


            {propertyPicturesFile.length < 4 && (
                <button
                    type="button"
                    onClick={addPictureField}
                    className="font-inter text-[14px] text-mainRed text-left"
                >
                    + Ajouter une image
                </button>
            )}

        </div>

    )

}