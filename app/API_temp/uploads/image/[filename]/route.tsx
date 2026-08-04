import { getTokenFromCookie } from "@/utils/utilsServer";
import { apiFileFetch } from "@/app/api/api";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;

        if (!filename) {
            return NextResponse.json(
                { error: "Nom du fichier manquant" },
                { status: 400 }
            );
        }

        // Empêche les attaques par traversal de chemin
        if (
            filename.includes("..") ||
            filename.includes("/") ||
            filename.includes("\\")
        ) {
            return NextResponse.json(
                { error: "Nom de fichier invalide" },
                { status: 400 }
            );
        }

        // Taille raisonnable du nom
        if (filename.length > 255) {
            return NextResponse.json(
                { error: "Nom de fichier trop long" },
                { status: 400 }
            );
        }

        const allowedExtensions = [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "gif",
        ];

        const extension = filename.split(".").pop()?.toLowerCase();

        if (!extension || !allowedExtensions.includes(extension)) {
            return NextResponse.json(
                { error: "Extension d'image invalide" },
                { status: 400 }
            );
        }

        const token = await getTokenFromCookie();

        const res = await apiFileFetch(
            `/uploads/${filename}`,
            "GET",
            token
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Image introuvable" },
                { status: res.status }
            );
        }

        const contentType =
            res.headers.get("content-type") ?? `image/${extension}`;

        const imageBuffer = await res.arrayBuffer();

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "private, max-age=86400",
            },
        });

    } catch (error) {
        console.error("Get image error:", error);

        return NextResponse.json(
            { error: "Erreur lors de la récupération de l'image" },
            { status: 500 }
        );
    }
}