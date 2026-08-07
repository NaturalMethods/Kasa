import {NextResponse} from "next/server";
import {getUserChats} from "@/services/messages.server.service";

/**
 * Get chats for a user by its ID
 * @param request
 * @param context
 * @constructor
 */
export async function GET(request: Request,
                          context: { params: Promise<{ id: string }> }) {

    {/* const token = await getTokenFromCookie()

    if(!token){ createErrorResponse(401, "Unauthorized") }
   TODO ajouter la vérif du token */}

    const {id} = await context.params
    const data2 = getUserChats(Number(id))

    return NextResponse.json( data2, {status: 200})

}
