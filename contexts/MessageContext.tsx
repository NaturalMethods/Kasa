"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode
} from "react";
import {MessageModal} from "@/components/modal/MessageModal";

interface MessageContextType {
    isOpen: boolean;
    receiverId?: number;
    propertyId?: string;
    openMessage: (
        receiverId: number,
        propertyId?: string
    ) => void;
    closeMessage: () => void;
}

const MessageContext = createContext<MessageContextType | null>(null);


export function MessageProvider({
                                    children
                                }: {
    children: ReactNode;
}) {

    const [isOpen, setIsOpen] = useState(false);
    const [receiverId, setReceiverId] = useState<number>();
    const [propertyId, setPropertyId] = useState<string>();


    function openMessage(
        receiverId: number,
        propertyId?: string
    ) {
        setReceiverId(receiverId);
        setPropertyId(propertyId);
        setIsOpen(true);
    }


    function closeMessage() {
        setIsOpen(false);
    }


    return (
        <MessageContext.Provider
            value={{
                isOpen,
                receiverId,
                propertyId,
                openMessage,
                closeMessage,
            }}
        >
            {children}

            {/* Modale globale */}
            <MessageModal />
        </MessageContext.Provider>
    );
}


export function useMessage() {

    const context = useContext(MessageContext);

    if (!context) {
        throw new Error(
            "useMessage must be used inside MessageProvider"
        );
    }

    return context;
}