import {requestFetch} from "@/services/request.service";


export async function register(lastname: string, firstname: string, email: string, password: string) {

    const body = { name:lastname+firstname, email:email , password: password}
    return await requestFetch(`/API/signin`, "POST", body)
}

export async function login(email:string, password:string) {


    const body = { email,password }

    return await requestFetch(`/API/login`, "POST", body)
}

export async function logout() {

    await fetch(
        "/API/logout",
        {
            method: "POST",
        }
    )
}