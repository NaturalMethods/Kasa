import { getTokenFromCookie } from "@/utils/utilsServer";
import {apiFetch, apiFileFetch, createErrorResponse} from "@/app/api/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const files = formData.getAll("file");
        const purpose = formData.get("purpose");

        console.log("files:", files);

        if (files.length === 0) {
            return createErrorResponse(400, "Aucun fichier envoyé");
        }

        if (files.length > 1) {
            return createErrorResponse(400, "Un seul fichier est autorisé");
        }

        const file = files[0];

        if (!(file instanceof File)) {
            return createErrorResponse(400, "Fichier invalide");
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ];

        if (!allowedTypes.includes(file.type)) {
            return createErrorResponse(
                400,
                "Le fichier doit être une image au format JPEG, PNG, WEBP ou GIF"
            );
        }

        if (typeof purpose !== "string") {
            return createErrorResponse(400, "Purpose manquant");
        }

        const token = await getTokenFromCookie();

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


export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        const { filenames } = body;

        console.log("filename:",filenames);

        if (!Array.isArray(filenames) || filenames.length === 0) {
            return createErrorResponse(
                400,
                "Aucun nom de fichier fourni"
            );
        }

        const token = await getTokenFromCookie();

        const res = await apiFetch(
            "/api/uploads/images",
            "DELETE",
            token,
            {
                filenames,
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return createErrorResponse(
                res.status,
                data.error ?? "Erreur lors de la suppression des images"
            );
        }

        return NextResponse.json(data, {
            status: res.status,
        });

    } catch (error) {
        console.error("Delete images error:", error);

        return createErrorResponse(
            500,
            "Erreur lors de la suppression des images"
        );
    }
}