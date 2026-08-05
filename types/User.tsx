/**
 * Describe a user
 */
export interface User{
    id: number;
    name: string;
    email?: string;
    picture?: string;
    role:  "owner" | "client" | "admin";

}