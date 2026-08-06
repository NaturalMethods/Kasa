"use client";

import { useMessage } from "@/contexts/MessageContext";

export function MessageModal() {

    const {
        isOpen,
        closeMessage,
        receiverId,
        propertyId,
    } = useMessage();


    if (!isOpen) {
        return null;
    }


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={closeMessage}
        >
            <div
                className="bg-white rounded p-6"
                onClick={(e) => e.stopPropagation()}
            >

                <h2>
                    Envoyer un message
                </h2>

                <p>
                    Destinataire : {receiverId}
                </p>

                <p>
                    Logement : {propertyId}
                </p>

                <button onClick={closeMessage}>
                    Fermer
                </button>

            </div>
        </div>
    );
}