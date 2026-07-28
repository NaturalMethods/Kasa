import { getTokenFromCookie } from "@/utils/utils";
import {apiFileFetch, createErrorResponse} from "@/app/API/api";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

    try {

        // Récupération du fichier + données envoyées par le front
        const formData = await request.formData();

        const file = formData.get("file");
        const purpose = formData.get("purpose");


        console.log("file:", file);
        console.log("purpose:", purpose);


        if (!(file instanceof File)) {
            return createErrorResponse(400, "Aucun fichier envoyé");
        }


        if (typeof purpose !== "string") {
            return createErrorResponse(400, "Purpose manquant");
        }


        const token = await getTokenFromCookie();


        // Nouveau FormData pour le vrai backend
        const backendFormData = new FormData();

        backendFormData.append("file", file);
        backendFormData.append("purpose", purpose);


        const res = await apiFileFetch(
            "/api/uploads/image",
            "POST",
            token,
            backendFormData
        );


        const data = await res.json();


        if (!res.ok) {
            return createErrorResponse(res.status, data.error);
        }


        return NextResponse.json(data, {
            status: res.status,
        });


    } catch (error) {

        console.error("Upload image error:", error);

        return createErrorResponse(
            500,
            "Erreur lors de l'upload de l'image"
        );
    }
}