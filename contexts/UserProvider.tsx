"use client"

import { ReactNode, useState } from "react"
import { UserContext } from "./UserContext"
import {User} from "@/types/User";

interface UserProviderProps {
    children: ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
)
}