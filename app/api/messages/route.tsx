import {NextRequest, NextResponse} from "next/server";
import {createMessage} from "@/services/messages.server.service";
import { verifyTokenById} from "@/utils/utilsServer";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const {
        text,
        senderId,
        receiverId
    } = body;

    const isValid = await verifyTokenById(Number(senderId));

    if (!isValid) {
        return NextResponse.json(
            { error: "Non authentifié" },
            { status: 401 }
        );
    }


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
