"use client";

import {useMessage} from "@/contexts/MessageContext";
import Image from "next/image";
import {Thumbnail} from "@/components/modal/Thumbnail";
import {MessageTextArea} from "@/components/modal/MessageTextArea";
import {useEffect, useRef, useState} from "react";
import {MessageBlock} from "@/components/modal/MessageBlock";
import {getChats, getConversation, sendMessage} from "@/services/messages.service";
import {useUser} from "@/contexts/useUser";
import {Message} from "@/types/Message";

/**
 * Conversation preview displayed in message list
 */
export interface ChatPreview {
    correspondantId: number;
    text: string;
    date: string;
}

export function MessageModal() {

    const {user} = useUser();

    const [message, setMessage] = useState("");
    const [chats, setChats] = useState<ChatPreview[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [conversation, setConversation] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {
        isOpen,
        closeMessage,
        receiverId,
        propertyId,
    } = useMessage();

    useEffect(() => {

        async function loadChats() {

            if (!user) return;

            const response = await getChats(user.id);
            const data = await response.json();

            setChats(data);

            if (data.length > 0) {
                setSelectedChatId(data[0].correspondantId);
            }
        }

        loadChats();

    }, [isOpen, user]);

    useEffect(() => {

        async function loadConversation() {

            if (!user || !selectedChatId) {
                return;
            }

            const correspondentId = selectedChatId;

            if (!correspondentId) {
                return;
            }
            const response = await getConversation(
                user.id,
                correspondentId
            );

            const data = await response.json();

            setConversation(data);
        }
        loadConversation();

    }, [selectedChatId, user, chats]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [conversation]);

    if (!isOpen) {
        return null;
    }

    async function handleSendMessage() {

        if (!user || !selectedChatId || !message.trim()) {
            return;
        }


        const response = await sendMessage({
            text: message,
            senderId: user.id,
            receiverId: selectedChatId,
        });


        if (!response.ok) {
            console.error("Erreur envoi message");
            return;
        }


        setMessage("");

        // recharge la conversation
        const refresh = await getConversation(
            user.id,
            selectedChatId
        );

        setConversation(await refresh.json());
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={closeMessage}
        >
            <div
                className="lg:w-264.75 lg:h-203.5 flex flex-row items-start bg-lightOrange rounded-[10px] shadow-[0px_4px_14px_3px_rgba(0,0,0,0.05)]"
                onClick={(e) => e.stopPropagation()}>


                {/* Left Column */}
                <div
                    className={"box-border flex flex-col items-start w-94 h-full gap-1.75 pl-2 pr-2 pt-3 pb-3 bg-white border-r border-lightGrey rounded-l-[10px] "}>

                    <div className="flex flex-col pt-4 pb-4 pr-2 pl-2 justify-center items-start gap-2.5">

                        <button
                            className="flex items-center justify-center w-23.25 h-9 gap-1 bg-lightGrey rounded-[10px]"
                            onClick={closeMessage}>
                            <Image
                                src="/icons/LeftArrow.svg"
                                width={8}
                                height={8}
                                alt=""
                            />
                            <span className={"font-inter text-[14px] font-medium text-darkGrey"}> Retour</span>
                        </button>

                    </div>

                    <div className="flex flex-col items-start gap-4 h-full overflow-hidden">
                        <h2 className={"font-medium pl-3"}>Messages</h2>
                        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">


                            {chats.map((chat) => (
                                <Thumbnail
                                    key={chat.correspondantId}
                                    lastMessage={chat.text}
                                    date={chat.date}
                                    selected={selectedChatId === chat.correspondantId}
                                    onClick={() => setSelectedChatId(chat.correspondantId)}
                                />
                            ))}


                        </div>
                    </div>

                </div>


                {/* Right Column */}
                <div className={"flex flex-col w-full h-full bg-lightOrange rounded-r-[10px] overflow-hidden"}>
                    <div className={"flex flex-col w-full h-full p-10 gap-4 overflow-y-auto"}>

                        {conversation.map((message) => {
                            return (
                                <MessageBlock
                                    key={message.id}
                                    isSender={message.senderId === user?.id}
                                    text={message.text}
                                    date={message.date}
                                />
                            );
                        })}

                        <div ref={messagesEndRef}/>

                    </div>
                    {/* Send message part */}
                    <div
                        className={"flex flex-col w-full h-34.25 pt-5 pb-5 pl-8 pr-8 bg-white items-start gap-2.5 border-t border-lightGrey "}>

                        <MessageTextArea
                            value={message}
                            setValue={setMessage}
                            onSend={handleSendMessage}
                        />

                    </div>

                </div>

            </div>
        </div>
    );
}