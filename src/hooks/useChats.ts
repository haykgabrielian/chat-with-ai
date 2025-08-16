import { useState, useEffect } from "react";
import { fetchGeminiResponse } from "@/api/gemini";
import { getAllChats, saveChat, deleteChat } from "@/db/db";
import { Chat, LoadingState } from "@/types/common";

export const useChats = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [loadingState, setLoadingState] = useState<LoadingState>({ isLoading: false });

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
        if (!message.trim() || loadingState.isLoading) return;

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

        // Set loading state
        setLoadingState({ isLoading: true, currentChatId: newChat.id });

        try {
            const geminiReply = await fetchGeminiResponse(newChat.messages);
            newChat.messages.push({ sender: "Gemini", text: geminiReply });
            newChat.timestamp = new Date().toISOString();

            await saveChat(newChat);
            await fetchChats();
            setSelectedChat(newChat);
        } catch (error) {
            console.error("Error getting response:", error);
            newChat.messages.push({ sender: "Gemini", text: "Sorry, I encountered an error. Please try again." });
            newChat.timestamp = new Date().toISOString();
            await saveChat(newChat);
            await fetchChats();
            setSelectedChat(newChat);
        } finally {
            setLoadingState({ isLoading: false });
        }
    };

    const sendMessage = async (message: string) => {
        if (!selectedChat || loadingState.isLoading) return;

        const now = new Date().toISOString();

        const updatedChat: Chat = {
            ...selectedChat,
            messages: [...selectedChat.messages, { sender: "Me", text: message }],
            timestamp: now,
        };

        await saveChat(updatedChat);
        await fetchChats();
        setSelectedChat(updatedChat);

        // Set loading state
        setLoadingState({ isLoading: true, currentChatId: selectedChat.id });

        try {
            const geminiReply = await fetchGeminiResponse(updatedChat.messages);
            updatedChat.messages.push({ sender: "Gemini", text: geminiReply });
            updatedChat.timestamp = new Date().toISOString();

            await saveChat(updatedChat);
            await fetchChats();
            setSelectedChat(updatedChat);
        } catch (error) {
            console.error("Error getting response:", error);
            updatedChat.messages.push({ sender: "Gemini", text: "Sorry, I encountered an error. Please try again." });
            updatedChat.timestamp = new Date().toISOString();
            await saveChat(updatedChat);
            await fetchChats();
            setSelectedChat(updatedChat);
        } finally {
            setLoadingState({ isLoading: false });
        }
    };

    const removeChat = async (chatId: string) => {
        try {
            await deleteChat(chatId);
            await fetchChats();
            
            // If the deleted chat was selected, clear the selection
            if (selectedChat && selectedChat.id === chatId) {
                setSelectedChat(null);
            }
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    };

    return { 
        chats, 
        selectedChat,
        loadingState,
        selectChat, 
        createNewChat, 
        sendMessage,
        removeChat
    };
};