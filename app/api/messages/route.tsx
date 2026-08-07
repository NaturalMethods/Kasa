import {NextRequest, NextResponse} from "next/server";
import {createMessage} from "@/services/messages.server.service";
import {getTokenFromCookie} from "@/utils/utilsServer";
import {createErrorResponse} from "@/app/api/api";

export async function POST(req: NextRequest) {


    {/* const token = await getTokenFromCookie()

    if(!token){ createErrorResponse(401, "Unauthorized") }
   TODO ajouter la vérif du token */}

    const body = await req.json();

    const {
        text,
        senderId,
        receiverId
    } = body;


    if (!text || !senderId || !receiverId) {
        return NextResponse.json(
            {error: "Données invalides"},
            {status: 400}
        );
    }


    const message = createMessage({
        text,
        senderId,
        receiverId,
    });


    return NextResponse.json(message);
}
