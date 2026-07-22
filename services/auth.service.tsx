import {requestFetch} from "@/services/request.service";


export async function register(){

    const body = { name:"Nathan", email:"nathan@example.com" , password: "secret123", role:"client" }

    const data = await requestFetch(`/auth/register`, "POST", body)

    console.log("registering:",data)

}

export async function login(){


    const body = { email:"alice@example.com" , password: "secret123" }

    const data = await requestFetch(`/auth/login`, "POST", body)

    console.log(data)
}