import {requestFetch} from "@/services/request.service";


export async function register(lastname: string, firstname: string, email: string, password: string) {

    const body = { name:lastname+firstname, email:email , password: password}

    return await requestFetch(`/API/signin`, "POST", body)

}

export async function login(){


    const body = { email:"alice@example.com" , password: "secret123" }

    const data = await requestFetch(`/auth/login`, "POST", body)

}