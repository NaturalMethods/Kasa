import {createContext} from "react"
import {User} from "@/types/User";

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
    loadingUser: boolean
}

/**
 * Context containing the current user
 */
export const UserContext = createContext<UserContextValue | null>(null)