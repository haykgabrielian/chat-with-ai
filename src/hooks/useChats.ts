import { useEffect, useState } from 'react';

import { fetchGeminiResponse } from '@/api/gemini';

import { deleteChat, getAllChats, saveChat } from '@/db/db';

import { Chat, LoadingState } from '@/types/common';

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
  });

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
      messages: [{ sender: 'Me', text: message }],
      timestamp: now,
    };

    await saveChat(newChat);
    await fetchChats();

    setLoadingState({
      isLoading: true,
      currentChatId: newChat.id,
      isStreaming: false,
    });
    setSelectedChat({ ...newChat });

    try {
      let fullResponse = '';
      const geminiReply = await fetchGeminiResponse(
        newChat.messages,
        (chunk: string) => {
          if (!fullResponse && chunk) {
            setLoadingState({
              isLoading: true,
              currentChatId: newChat.id,
              isStreaming: true,
            });
            newChat.messages.push({
              sender: 'Gemini',
              text: '',
            });
          }
          fullResponse += chunk;

          const updatedChat = {
            ...newChat,
            messages: newChat.messages.map((msg, index) =>
              index === newChat.messages.length - 1
                ? { ...msg, text: fullResponse }
                : msg
            ),
          };

          setSelectedChat(updatedChat);
        }
      );

      newChat.messages[newChat.messages.length - 1] = {
        sender: 'Gemini',
        text: fullResponse || geminiReply,
      };
      newChat.timestamp = new Date().toISOString();

      await saveChat(newChat);
      await fetchChats();
      setSelectedChat(newChat);
    } catch (error) {
      console.error('Error getting response:', error);
      newChat.messages[newChat.messages.length - 1] = {
        sender: 'Gemini',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      newChat.timestamp = new Date().toISOString();
      await saveChat(newChat);
      await fetchChats();
      setSelectedChat(newChat);
    } finally {
      setLoadingState({ isLoading: false, isStreaming: false });
    }
  };

  const sendMessage = async (message: string) => {
    if (!selectedChat || loadingState.isLoading) return;

    const now = new Date().toISOString();

    const updatedChat: Chat = {
      ...selectedChat,
      messages: [...selectedChat.messages, { sender: 'Me', text: message }],
      timestamp: now,
    };

    await saveChat(updatedChat);
    await fetchChats();
    setLoadingState({
      isLoading: true,
      currentChatId: selectedChat.id,
      isStreaming: false,
    });
    setSelectedChat({ ...updatedChat });

    try {
      let fullResponse = '';
      const geminiReply = await fetchGeminiResponse(
        updatedChat.messages,
        (chunk: string) => {
          if (!fullResponse && chunk) {
            setLoadingState({
              isLoading: true,
              currentChatId: selectedChat.id,
              isStreaming: true,
            });
            updatedChat.messages.push({
              sender: 'Gemini',
              text: '',
            });
          }
          fullResponse += chunk;
          const realTimeChat = {
            ...updatedChat,
            messages: updatedChat.messages.map((msg, index) =>
              index === updatedChat.messages.length - 1
                ? { ...msg, text: fullResponse }
                : msg
            ),
          };
          setSelectedChat(realTimeChat);
        }
      );

      updatedChat.messages[updatedChat.messages.length - 1] = {
        sender: 'Gemini',
        text: fullResponse || geminiReply,
      };
      updatedChat.timestamp = new Date().toISOString();

      await saveChat(updatedChat);
      await fetchChats();
      setSelectedChat(updatedChat);
    } catch (error) {
      console.error('Error getting response:', error);
      updatedChat.messages[updatedChat.messages.length - 1] = {
        sender: 'Gemini',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      updatedChat.timestamp = new Date().toISOString();
      await saveChat(updatedChat);
      await fetchChats();
      setSelectedChat(updatedChat);
    } finally {
      setLoadingState({ isLoading: false, isStreaming: false });
    }
  };

  const removeChat = async (chatId: string) => {
    try {
      await deleteChat(chatId);
      await fetchChats();

      if (selectedChat && selectedChat.id === chatId) {
        setSelectedChat(null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  return {
    chats,
    selectedChat,
    loadingState,
    selectChat,
    createNewChat,
    sendMessage,
    removeChat,
  };
};
