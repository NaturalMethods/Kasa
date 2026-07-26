
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