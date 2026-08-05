import {requestFetch} from "@/services/request.service";

/**
 * Request sent to the server(backend for frontend) to create a new user
 * @param lastname
 * @param firstname
 * @param email
 * @param password
 */
export async function register(lastname: string, firstname: string, email: string, password: string) {

    const body = { name:lastname+firstname, email:email , password: password}
    return await requestFetch(`/api/signin`, "POST", body)
}

/**
 * Request sent to log in
 * @param email
 * @param password
 */
export async function login(email:string, password:string) {

    const body = { email,password }

    return await requestFetch(`/api/login`, "POST", body)
}

/**
 * Request to ask the server to clean the token and log out
 */
export async function logout() {

    await fetch(
        "/api/logout",
        {
            method: "POST",
        }
    )
}

/**
 * Fetch the current user from the server (BFF)
 */
export async function getCurrentUser() {
    return await requestFetch("/api/users/me", "GET");
}