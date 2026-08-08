import {NextResponse} from "next/server";
import {getUserChats} from "@/services/messages.server.service";
import {verifyTokenById} from "@/utils/utilsServer";

/**
 * Get chats for a user by its ID
 * @param request
 * @param context
 * @constructor
 */
export async function GET(request: Request,
                          context: { params: Promise<{ id: string }> }) {


    const {id} = await context.params
    const isValid = await verifyTokenById(Number(id));

    if (!isValid) {
        return NextResponse.json(
            { error: "Non authentifié" },
            { status: 401 }
        );
    }
    const data2 = getUserChats(Number(id))

    return NextResponse.json( data2, {status: 200})

}
