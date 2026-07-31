import { getTokenFromCookie } from "@/utils/utilsServer";
import { apiFetch } from "@/app/api/api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const token = await getTokenFromCookie();

        console.log("Token :", token);

        if (!token) {
            return NextResponse.json(
                { error: "Utilisateur non authentifié" },
                { status: 401 }
            );
        }

        // Décodage du JWT pour récupérer l'id utilisateur
        const payload = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
        );

        const userId = payload.id; // ou payload.id selon ton JWT

        if (!userId) {
            return NextResponse.json(
                { error: "Id utilisateur introuvable dans le token" },
                { status: 401 }
            );
        }



        const res = await apiFetch(
            `/api/users/${userId}`,
            "GET",
            token
        );

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { error: data.error ?? "Erreur récupération utilisateur" },
                { status: res.status }
            );
        }

        return NextResponse.json(data, {
            status: 200,
        });

    } catch (error) {
        console.error("Get current user error:", error);

        return NextResponse.json(
            { error: "Erreur lors de la récupération utilisateur" },
            { status: 500 }
        );
    }
}