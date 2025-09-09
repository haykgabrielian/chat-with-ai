import { useEffect, useState } from 'react';

import { fetchGeminiResponse, generateChatTitle } from '@/api/gemini';

import { deleteChat, getAllChats, saveChat, updateChatTitle } from '@/db/db';

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
    console.log('createNewChat');
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
    setChats(prevChats => [...prevChats, newChat]);

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
      setSelectedChat(newChat);

      try {
        const generatedTitle = await generateChatTitle(message);
        updateChatTitle(newChat.id, generatedTitle)
          .then(() => {
            setChats(prevChats =>
              prevChats.map(chat =>
                chat.id === newChat.id
                  ? { ...chat, name: generatedTitle }
                  : chat
              )
            );
            newChat.name = generatedTitle;
            setSelectedChat(newChat);
          })
          .catch(error => {
            console.error('Error updating chat title:', error);
          });
      } catch (error) {
        console.error('Error generating title:', error);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      newChat.messages[newChat.messages.length - 1] = {
        sender: 'Gemini',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      newChat.timestamp = new Date().toISOString();
      await saveChat(newChat);
      setChats(prevChats =>
        prevChats.map(chat => (chat.id === newChat.id ? newChat : chat))
      );
      setSelectedChat(newChat);
    } finally {
      setLoadingState({ isLoading: false, isStreaming: false });
    }
  };

  const sendMessage = async (message: string) => {
    console.log('sendMessage');
    if (!selectedChat || loadingState.isLoading) return;

    const now = new Date().toISOString();

    const updatedChat: Chat = {
      ...selectedChat,
      messages: [...selectedChat.messages, { sender: 'Me', text: message }],
      timestamp: now,
    };

    await saveChat(updatedChat);
    setChats(prevChats =>
      prevChats.map(chat => (chat.id === selectedChat.id ? updatedChat : chat))
    );
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
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat.id ? updatedChat : chat
        )
      );
      setSelectedChat(updatedChat);
    } catch (error) {
      console.error('Error getting response:', error);
      updatedChat.messages[updatedChat.messages.length - 1] = {
        sender: 'Gemini',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      updatedChat.timestamp = new Date().toISOString();
      await saveChat(updatedChat);
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat.id ? updatedChat : chat
        )
      );
      setSelectedChat(updatedChat);
    } finally {
      setLoadingState({ isLoading: false, isStreaming: false });
    }
  };

  const removeChat = async (chatId: string) => {
    deleteChat(chatId)
      .then(() => {
        setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));

        if (selectedChat && selectedChat.id === chatId) {
          setSelectedChat(null);
        }
      })
      .catch(error => {
        console.error('Error deleting chat:', error);
      });
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
