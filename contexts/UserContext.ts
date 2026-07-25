import { createContext } from "react"
import {User} from "@/types/User";

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextValue | null>(null)