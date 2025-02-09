import { openDB } from "idb";

const DB_NAME = "ChatAppDB";
const STORE_NAME = "chats";

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        },
    });
};

export const saveChat = async (chat: { id: string; name: string; messages: { sender: string; text: string }[] }) => {
    const db = await initDB();
    await db.put(STORE_NAME, chat);
};

export const getAllChats = async () => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
};
