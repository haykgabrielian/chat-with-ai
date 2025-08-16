import React from "react";
import styled from "styled-components";
import { Chat } from "../types/common";

type Props = {
    chats: Chat[];
    selectedChatId: string | null;
    selectChat: (chat: Chat | null) => void;
};

const Container = styled.div`
    width: 300px;
    background-color: #40414f;
    padding: 16px;
    overflow-y: auto;
`;

const Title = styled.h2`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 0 12px;
    font-size: 1.125rem;
    font-weight: bold;
    text-align: left;
    color: #cfcfcf;
`;

const ChatItem = styled.li<{ isSelected: boolean }>`
    padding: 8px 12px;
    margin-bottom: 5px;
    cursor: pointer;
    color: #cfcfcf;
    border-radius: 10px;
    text-align: left;
    background-color: ${(props) => (props.isSelected ? "#1b1b22" : "transparent")};
    &:hover {
        background-color: #1b1b22;
    }
`;

const NewChatButton = styled.button`
    background-color: #565969;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    width: 22px;
    height: 22px;
    
    &:hover {
        background-color: #0d8f6f;
    }
    
    svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
    }
`;

const NoChatsMessage = styled.p`
    color: #cfcfcf;
`;

const ChatList: React.FC<Props> = ({ chats, selectedChatId, selectChat }) => {
    return (
        <Container>
            <Title>
                <p>Chats</p>
                <NewChatButton onClick={() => selectChat(null)} title="New Chat">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="m 3 1 c -1.644531 0 -3 1.355469 -3 3 v 6 c 0 1.644531 1.355469 3 3 3 h 1 v 3 l 3 -3 v -1 c 0 -0.550781 -0.449219 -1 -1 -1 h -3 c -0.570312 0 -1 -0.429688 -1 -1 v -6 c 0 -0.554688 0.445312 -1 1 -1 h 10 c 0.554688 0 1 0.445312 1 1 v 4 c 0 0.550781 0.449219 1 1 1 s 1 -0.449219 1 -1 v -4 c 0 -1.644531 -1.355469 -3 -3 -3 z m 8 7 v 3 h -3 v 2 h 3 v 3 h 2 v -3 h 3 v -2 h -3 v -3 z m 0 0"/>
                    </svg>
                </NewChatButton>
            </Title>
            <ul>
                {chats.length > 0 ? (
                    [...chats].sort((a, b) => (b.timestamp ?? '').localeCompare(a.timestamp ?? '')).map(chat => (
                        <ChatItem
                            key={chat.id}
                            onClick={() => selectChat(chat)}
                            isSelected={chat.id === selectedChatId}
                        >
                            {chat.name}
                        </ChatItem>
                    ))
                ) : (
                    <NoChatsMessage>No chats available. Start a new one!</NoChatsMessage>
                )}
            </ul>
        </Container>
    );
};

export default ChatList;
