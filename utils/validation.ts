import {PropertyDetail} from "@/types/Property";

export interface LoginFormData {
    email: string;
    password: string;
}
export interface RegisterFormData extends LoginFormData {
    lastname: string;
    firstname: string;
    acceptedTerms: boolean;
}


export function validateRegisterForm(data: RegisterFormData) {

    const errors: {
        lastname?: string;
        firstname?: string;
        email?: string;
        password?: string;
        acceptedTerms?: string;
    } = {};


    if (!data.lastname.trim()) {
        errors.lastname = "Le nom est obligatoire";
    }


    if (!data.firstname.trim()) {
        errors.firstname = "Le prénom est obligatoire";
    }


    if (!data.email.trim()) {
        errors.email = "L'adresse email est obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "L'adresse email est invalide";
    }


    if (!data.password.trim()) {
        errors.password = "Le mot de passe est obligatoire";
    } else if (data.password.length < 8) {
        errors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }


    if (!data.acceptedTerms) {
        errors.acceptedTerms = "Vous devez accepter les conditions générales d'utilisation";
    }


    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}

export function validateLoginForm(data: LoginFormData) {

    const errors: {
        lastname?: string;
        firstname?: string;
        email?: string;
        password?: string;
        acceptedTerms?: string;
    } = {};

    if (!data.email.trim()) {
        errors.email = "L'adresse email est obligatoire";
    }

    if (!data.password.trim()) {
        errors.password = "Le mot de passe est obligatoire";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };

}

interface NewPropertyFormData {
    property: PropertyDetail;
    propertyCoverFile: File | null;
    propertyPicturesFile: (File | null)[];
    hostPicFile: File | null;
}

export function validateNewPropertyForm(data: NewPropertyFormData) {

    const errors: {
        title?: string;
        description?: string;
        location?: string;
        price_per_night?: string;
        cover?: string;
        pictures?: string;
        hostName?: string;
        hostPicture?: string;
    } = {};

    if (!data.property.title.trim()) {
        errors.title = "Le titre est obligatoire";
    }

    if (!data.property.description?.trim()) {
        errors.description = "La description est obligatoire";
    }

    if (!data.property.location?.trim()) {
        errors.location = "La localisation est obligatoire";
    }

    if (!data.propertyCoverFile) {
        errors.cover = "L'image de couverture est obligatoire";
    }

    if (
        data.propertyPicturesFile.length === 0 ||
        data.propertyPicturesFile.every((file) => file === null)
    ) {
        errors.pictures = "Au moins une image du logement est obligatoire";
    }

    if (!data.property.host?.name.trim()) {
        errors.hostName = "Le nom de l'hôte est obligatoire";
    }

    if (!data.hostPicFile) {
        errors.hostPicture = "La photo de l'hôte est obligatoire";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}
