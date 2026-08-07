/**
 * Message stored in local database
 */
export interface Message {
    id: number;
    text: string;
    senderId: number;
    receiverId: number;
    date: string;
}