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
    background-color: #171717;
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
    background-color: ${(props) => (props.isSelected ? "#424242" : "transparent")};
    &:hover {
        background-color: #595959;
    }
`;

const NewChatButton = styled.button`
    background-color: #007bff;
    font-size: 12px;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 14px;
    cursor: pointer;
    border-top: 1px solid #636363;
    outline: none;
    &:hover {
        background-color: #0056b3;
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
                <NewChatButton onClick={() => selectChat(null)}>New Chat</NewChatButton>
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
