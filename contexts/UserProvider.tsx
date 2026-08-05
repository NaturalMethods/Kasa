"use client"

import {ReactNode, useEffect, useState} from "react"
import {UserContext} from "./UserContext"
import {User} from "@/types/User"
import {getCurrentUser} from "@/services/auth.service"

interface UserProviderProps {
    children: ReactNode
}

/**
 * Provide datas of the current user and fetch user if connected but not defined
 * @param param0
 * @param param0.children
 * @constructor
 */
export default function UserProvider({children}: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        async function loadUser() {
            if (document.cookie.includes("hasSession=true")) {
                try {


                    const response = await getCurrentUser()

                    if (response.ok) {
                        const data = await response.json()
                        setUser(data)
                    }
                } catch (error) {
                    console.error("Erreur récupération utilisateur :", error)
                } finally {
                    setLoadingUser(false)
                }
            }
        }

        loadUser()
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                loadingUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}