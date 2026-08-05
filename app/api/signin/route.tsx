import {apiRequest, createErrorResponse} from "@/app/api/api"
import {setTokenFromCookie} from "@/utils/utilsServer";

/**
 * Send datas from the register form to the backend to create a new user and return the token/user
 * @param req
 * @constructor
 */
export async function POST(req: Request) {

    const body = await req.json()
    const {name, email, password} = body

    const res = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({name, email, password, role: "client"}),
    })

    const data = await res.json()

    //If response is not a success, return an error response
    if (res.status !== 201) {
        return createErrorResponse(res.status, data.error)
    }

    const token = data.token
    const user = data.user

    return setTokenFromCookie(user, token)

}