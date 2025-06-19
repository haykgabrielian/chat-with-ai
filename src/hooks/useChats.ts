import { useState, useEffect } from "react";
import { fetchGeminiResponse } from "../api/gemini";
import { getAllChats, saveChat } from "../db/db";
import { Chat } from "../types/common";

export const useChats = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    const fetchChats = async () => {
        const storedChats = await getAllChats();
        setChats(storedChats);
    };

    useEffect(() => {
        fetchChats();
    }, []);

    const selectChat = (chat: Chat | null) => {
        setSelectedChat(chat);
    };

    const createNewChat = async (message: string) => {
        if (!message.trim()) return;

        const getFirstFourWords = (sentence: string) => {
            return sentence.split(' ').slice(0, 4).join(' ');
        };

        const now = new Date().toISOString();

        const newChat: Chat = {
            id: Date.now().toString(),
            name: getFirstFourWords(message),
            messages: [{ sender: "Me", text: message }],
            timestamp: now,
        };

        await saveChat(newChat);
        await fetchChats();
        setSelectedChat(newChat);

        const geminiReply = await fetchGeminiResponse(newChat.messages);
        newChat.messages.push({ sender: "Gemini", text: geminiReply });
        newChat.timestamp = new Date().toISOString();

        await saveChat(newChat);
        await fetchChats();
    };

    const sendMessage = async (message: string) => {
        if (!selectedChat) return;

        const now = new Date().toISOString();

        const updatedChat: Chat = {
            ...selectedChat,
            messages: [...selectedChat.messages, { sender: "Me", text: message }],
            timestamp: now,
        };

        await saveChat(updatedChat);
        await fetchChats();
        setSelectedChat(updatedChat);

        const geminiReply = await fetchGeminiResponse(updatedChat.messages);
        updatedChat.messages.push({ sender: "Gemini", text: geminiReply });
        updatedChat.timestamp = new Date().toISOString();

        await saveChat(updatedChat);
        await fetchChats();
    };

    return { chats, selectedChat, selectChat, createNewChat, sendMessage };
};