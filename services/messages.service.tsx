import {requestFetch} from "@/services/request.service";


export async function getChats(userId: number) {
    return await requestFetch(`/api/messages/${userId}`, "GET")
}

export async function getConversation(userId: number, correspondentId: number) {

    return await requestFetch(
        `/api/messages/${userId}/${correspondentId}`, 'GET');
}

export async function sendMessage(message: { text: string; senderId: number; receiverId: number; }) {


    return await requestFetch("/api/messages","POST", message);

}