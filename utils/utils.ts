import {cookies} from "next/headers";

export async function getTokenFromCookie(){

    const cookieStore = await cookies()
    return cookieStore.get("kasatoken")?.value

}

export function formatImageUrl(path?: string) {

    if (!path) return "";

    if (path.startsWith("/uploads/")) {
        return `http://${process.env.BACKEND_PUBLIC}:${process.env.BACKEND_PORT}${path}`;
    }

    return path;
}