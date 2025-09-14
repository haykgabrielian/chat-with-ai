import { openDB } from 'idb';

const DB_NAME = 'ChatAppDB';
const STORE_NAME = 'chats';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveChat = async (chat: {
  id: string;
  name: string;
  messages: { sender: string; text: string; id: string }[];
  pinned: boolean;
}) => {
  const db = await initDB();
  await db.put(STORE_NAME, chat);
};

export const getAllChats = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const deleteChat = async (chatId: string) => {
  const db = await initDB();
  await db.delete(STORE_NAME, chatId);
};

export const updateChatTitle = async (chatId: string, newTitle: string) => {
  const db = await initDB();
  const chat = await db.get(STORE_NAME, chatId);
  if (chat) {
    chat.name = newTitle;
    await db.put(STORE_NAME, chat);
  }
};

export const toggleChatPin = async (chatId: string) => {
  const db = await initDB();
  const chat = await db.get(STORE_NAME, chatId);
  if (chat) {
    chat.pinned = !chat.pinned;
    await db.put(STORE_NAME, chat);
    return chat.pinned;
  }
  return false;
};
