import { NextResponse } from "next/server";

const ALLOWED_REMOTE_HOSTS = [
    "s3-eu-west-1.amazonaws.com",
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 Mo

export async function GET(request: Request, {params,}: { params: Promise<{ remote: string[] }>; }) {
    console.log("remote:")
    try {
        const { remote } = await params;
        console.log("remote:", remote);

        if (!remote?.length) {
            return NextResponse.json(
                { error: "URL manquante" },
                { status: 400 }
            );
        }


        const remoteUrl = decodeURIComponent(remote.join("/"));
        console.log("remoteUrl:", remoteUrl);

        let parsedUrl: URL;

        try {
            parsedUrl = new URL(remoteUrl);
        } catch {
            console.log("Jusqu'dedans")
            return NextResponse.json(
                { error: "URL invalide" },
                { status: 400 }
            );
        }

        if (parsedUrl.protocol !== "https:") {
            return NextResponse.json(
                { error: "HTTPS obligatoire" },
                { status: 400 }
            );
        }

        if (!ALLOWED_REMOTE_HOSTS.includes(parsedUrl.hostname)) {
            return NextResponse.json(
                { error: "Domaine interdit" },
                { status: 403 }
            );
        }

        const response = await fetch(remoteUrl);

        if (!response.ok) {
            return NextResponse.json(
                { error: "Image introuvable" },
                { status: response.status }
            );
        }

        const contentType = response.headers.get("content-type");

        if (!contentType?.startsWith("image/")) {
            return NextResponse.json(
                { error: "Le fichier n'est pas une image" },
                { status: 415 }
            );
        }

        const contentLength = Number(response.headers.get("content-length"));

        if (contentLength && contentLength > MAX_IMAGE_SIZE) {
            return NextResponse.json(
                { error: "Image trop volumineuse" },
                { status: 413 }
            );
        }

        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=86400, immutable",
            },
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Erreur lors du chargement de l'image" },
            { status: 500 }
        );
    }
}