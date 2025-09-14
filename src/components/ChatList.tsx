import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';

import {
  ChatIcon,
  LoginIcon,
  PinIcon,
  TrashIcon,
  UserIcon,
} from '@/components/icons';
import Button from '@/components/Button';

import { Chat } from '@/types/common';
import ConfirmationPopup from '@/components/ConfirmationPopup';
import Search from '@/components/Search';
import { ThemeType } from '@/helpers/themes';

type Props = {
  chats: Chat[];
  selectedChatId: string | null;
  selectChat: (chat: Chat | null) => void;
  removeChat: (chatId: string) => Promise<void>;
  togglePin: (chatId: string) => Promise<void>;
};

const Container = styled.div<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 80px 10px 0 10px;
  background-color: ${props => props.theme.background.sidebar};
`;

const Header = styled.div`
  flex-shrink: 0;
`;

const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ChatItem = styled.li<{ $isSelected: boolean; theme: ThemeType }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  color: ${props => props.theme.text.primary};
  border-radius: 10px;
  text-align: left;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.$isSelected
      ? props.theme.background.chatItemSelected
      : 'transparent'};
  &:hover {
    background-color: ${props => props.theme.background.chatItemHover};
  }
`;

const ChatName = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  position: absolute;
  right: 2px;
  display: flex;
  gap: 4px;
  align-items: center;
  background: ${props => props.theme.background.chatItemHover};
  opacity: 0;
`;

const DeleteButton = styled.button<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: ${props => props.theme.text.secondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  opacity: 1;
  transition: background-color 0.2s ease;

  &:hover {
    color: ${props => props.theme.button.deleteHover};
    background-color: ${props => props.theme.button.deleteBgHover};
  }

  svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
`;

const PinButton = styled.button<{ theme: ThemeType; $isPinned: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: ${props => props.theme.text.secondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  opacity: 1;
  transition: background-color 0.2s ease;

  &:hover {
    color: ${props => props.theme.button.primaryHover};
    background-color: ${props => props.theme.button.primaryBgHover};
  }

  svg {
    fill: currentColor;
  }
`;

const ChatItemContainerWithButtons = styled.div`
  &:hover ${ButtonGroup} {
    opacity: 1;
  }
`;

const SectionHeader = styled.div<{ theme: ThemeType }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 8px 10px 4px 10px;
  margin-top: 16px;
  font-size: 12px;
  text-align: left;
  color: ${props => props.theme.text.secondary};

  svg {
    fill: currentColor;
  }

  &:first-child {
    margin-top: 0;
  }
`;

const Footer = styled.div`
  padding: 20px 0;
  flex-shrink: 0;
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

const NoChatsIcon = styled.div<{ theme: ThemeType }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${props => props.theme.button.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: ${props => props.theme.text.white};
`;

const NoChatsTitle = styled.h3<{ theme: ThemeType }>`
  color: ${props => props.theme.text.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const NoChatsMessage = styled.p<{ theme: ThemeType }>`
  color: ${props => props.theme.text.secondary};
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

const ChatList = ({
  chats,
  selectedChatId,
  selectChat,
  removeChat,
  togglePin,
}: Props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 800);
    return () => clearTimeout(handler);
  }, [query]);

  const { pinnedChats, unpinnedChats } = useMemo(() => {
    const filtered = [...chats].filter(chat =>
      chat.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const pinned = filtered
      .filter(chat => chat.pinned)
      .sort((a, b) => (b.timestamp ?? '').localeCompare(a.timestamp ?? ''));

    const unpinned = filtered
      .filter(chat => !chat.pinned)
      .sort((a, b) => (b.timestamp ?? '').localeCompare(a.timestamp ?? ''));

    return { pinnedChats: pinned, unpinnedChats: unpinned };
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
    setChatToDelete(chatId);
  };

  const handleTogglePin = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    try {
      await togglePin(chatId);
    } catch (error) {
      console.error('Failed to toggle pin:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!chatToDelete) return;
    try {
      await removeChat(chatToDelete);
      setChatToDelete(null);
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const handleCancelDelete = () => {
    setChatToDelete(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(false);
    navigate({ to: '/authentication' });
  };

  const renderChatItem = (chat: Chat) => (
    <ChatItemContainerWithButtons key={chat.id}>
      <ChatItem
        onClick={() => selectChat(chat)}
        $isSelected={chat.id === selectedChatId}
      >
        <ChatName>{chat.name}</ChatName>
        <ButtonGroup>
          <PinButton
            onClick={e => handleTogglePin(e, chat.id)}
            title={chat.pinned ? 'Unpin chat' : 'Pin chat'}
            $isPinned={chat.pinned}
          >
            <PinIcon size={16} />
          </PinButton>
          <DeleteButton
            onClick={e => handleDeleteChat(e, chat.id)}
            title='Delete chat'
          >
            <TrashIcon size={16} />
          </DeleteButton>
        </ButtonGroup>
      </ChatItem>
    </ChatItemContainerWithButtons>
  );

  return (
    <>
      <Container>
        <Header>
          <Button
            fullWidth
            size='medium'
            variant='primary'
            onClick={() => selectChat(null)}
          >
            New Chat
          </Button>
          <Search
            query={query}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
          />
        </Header>
        <ChatListContainer>
          <List>
            {pinnedChats.length > 0 || unpinnedChats.length > 0 ? (
              <>
                {pinnedChats.length > 0 && (
                  <>
                    <SectionHeader>
                      <PinIcon size={16} /> Pinned
                    </SectionHeader>
                    {pinnedChats.map(renderChatItem)}
                  </>
                )}
                {unpinnedChats.length > 0 && (
                  <>
                    <SectionHeader>All</SectionHeader>
                    {unpinnedChats.map(renderChatItem)}
                  </>
                )}
              </>
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
            <Button
              fullWidth
              size='medium'
              icon={<UserIcon size={16} />}
              variant='primary'
              onClick={handleLogin}
            >
              John Doe
            </Button>
          ) : (
            <Button
              fullWidth
              size='medium'
              icon={<LoginIcon size={16} />}
              variant='primary'
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </Footer>
      </Container>
      {chatToDelete !== null && (
        <ConfirmationPopup
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title='Delete Conversation'
          subtitle='Are you sure you want to delete this conversation? This action cannot be undone.'
          confirmButtonText='Delete'
          iconLevel='critical'
        />
      )}
    </>
  );
};

export default ChatList;
