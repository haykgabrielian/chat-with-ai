import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ChatIcon, LoginIcon, TrashIcon, UserIcon } from '@/components/icons';

import { Chat } from '@/types/common';
import Search from '@/components/Search';

import { BACKGROUND_COLORS, BUTTON_COLORS, TEXT_COLORS } from '@/theme/colors';

type Props = {
  chats: Chat[];
  selectedChatId: string | null;
  selectChat: (chat: Chat | null) => void;
  removeChat: (chatId: string) => Promise<void>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 80px 10px 0 10px;
  background-color: ${BACKGROUND_COLORS.SIDEBAR};
`;

const Header = styled.div`
  flex-shrink: 0;
`;

const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ChatItem = styled.li<{ isSelected: boolean }>`
  padding: 8px 12px;
  margin-bottom: 5px;
  cursor: pointer;
  color: ${TEXT_COLORS.PRIMARY};
  border-radius: 10px;
  text-align: left;
  background-color: ${props =>
    props.isSelected ? BACKGROUND_COLORS.CHAT_ITEM_SELECTED : 'transparent'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${BACKGROUND_COLORS.CHAT_ITEM_HOVER};
  }
`;

const ChatName = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${TEXT_COLORS.SECONDARY};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition:
    opacity 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: ${BUTTON_COLORS.DELETE_HOVER};
    background-color: ${BUTTON_COLORS.DELETE_BG_HOVER};
  }

  svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
`;

const ChatItemContainer = styled.div`
  &:hover ${DeleteButton} {
    opacity: 1;
  }
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  background-color: ${BUTTON_COLORS.PRIMARY};
  color: ${TEXT_COLORS.WHITE};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 8px;

  &:hover {
    background-color: ${BUTTON_COLORS.PRIMARY_HOVER};
  }
`;

const Footer = styled.div`
  padding: 20px 0;
  flex-shrink: 0;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  background-color: ${BUTTON_COLORS.PRIMARY};
  color: ${TEXT_COLORS.WHITE};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  gap: 8px;

  &:hover {
    background-color: ${BUTTON_COLORS.PRIMARY_HOVER};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  background-color: ${BUTTON_COLORS.PRIMARY};
  color: ${TEXT_COLORS.WHITE};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  gap: 8px;

  &:hover {
    background-color: ${BUTTON_COLORS.PRIMARY_HOVER};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`;

const NoChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  text-align: center;
  min-height: 200px;
`;

const NoChatsIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${BUTTON_COLORS.PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: ${TEXT_COLORS.WHITE};
`;

const NoChatsTitle = styled.h3`
  color: ${TEXT_COLORS.PRIMARY};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const NoChatsMessage = styled.p`
  color: ${TEXT_COLORS.SECONDARY};
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

const ChatList = ({ chats, selectedChatId, selectChat, removeChat }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 800);
    return () => clearTimeout(handler);
  }, [query]);

  const filteredChats = useMemo(() => {
    return [...chats]
      .filter(chat =>
        chat.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      .sort((a, b) => (b.timestamp ?? '').localeCompare(a.timestamp ?? ''));
  }, [chats, debouncedQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleSearchClear = useCallback(() => {
    setQuery('');
  }, []);

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    removeChat(chatId);
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Container>
      <Header>
        <NewChatButton onClick={() => selectChat(null)}>New Chat</NewChatButton>
        <Search
          query={query}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
        />
      </Header>
      <ChatListContainer>
        <List>
          {filteredChats.length > 0 ? (
            [...filteredChats]
              .sort((a, b) =>
                (b.timestamp ?? '').localeCompare(a.timestamp ?? '')
              )
              .map(chat => (
                <ChatItemContainer key={chat.id}>
                  <ChatItem
                    onClick={() => selectChat(chat)}
                    isSelected={chat.id === selectedChatId}
                  >
                    <ChatName>{chat.name}</ChatName>
                    <DeleteButton
                      onClick={e => handleDeleteChat(e, chat.id)}
                      title='Delete chat'
                    >
                      <TrashIcon />
                    </DeleteButton>
                  </ChatItem>
                </ChatItemContainer>
              ))
          ) : (
            <NoChatsContainer>
              <NoChatsIcon>
                <ChatIcon size={24} />
              </NoChatsIcon>
              <NoChatsTitle>No chats Found</NoChatsTitle>
              <NoChatsMessage>
                Start a conversation by clicking "New Chat" above or send a
                message.
              </NoChatsMessage>
            </NoChatsContainer>
          )}
        </List>
      </ChatListContainer>
      <Footer>
        {isLoggedIn ? (
          <UserButton onClick={handleLogin}>
            <UserIcon size={16} />
            John Doe
          </UserButton>
        ) : (
          <LoginButton onClick={handleLogin}>
            <LoginIcon size={16} />
            Login
          </LoginButton>
        )}
      </Footer>
    </Container>
  );
};

export default ChatList;
