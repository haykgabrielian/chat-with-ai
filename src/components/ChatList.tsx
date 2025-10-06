import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';

import {
  ChatIcon,
  LogoutIcon,
  PinIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
} from '@/components/icons';
import Button from '@/components/Button';
import { logout } from '@/auth/auth';

import Avatar from '@/components/Avatar';
import { Chat } from '@/types/common';
import ConfirmationPopup from '@/components/ConfirmationPopup';
import Search from '@/components/Search';
import { ThemeType } from '@/helpers/themes';
import { useAuth } from '@/hooks/useAuth';

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
  padding-top: 80px;
  background-color: ${props => props.theme.background.sidebar};
`;

const Header = styled.div`
  flex-shrink: 0;
  padding: 0 10px;
`;

const ChatListContainer = styled.div`
  flex: 1;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
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

const ButtonGroup = styled.div<{ theme: ThemeType }>`
  position: absolute;
  right: -60px;
  display: flex;
  gap: 4px;
  align-items: center;
  background: ${props => props.theme.background.chatItemHover};
  opacity: 0;
  border-radius: 8px;
  transition: all 0.2s ease;
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
    right: 2px;
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
  position: relative;
  padding: 20px 10px;
  flex-shrink: 0;
`;

const UserMenu = styled.div<{ theme: ThemeType }>`
  position: absolute;
  bottom: 64px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: ${props => props.theme.background.chatItemSelected};
  border-radius: 8px;
  z-index: 1000;
  overflow: hidden;
`;

const UserMenuItem = styled.button<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: ${props => props.theme.text.primary};
  opacity: ${props => (props.disabled ? 0.6 : 1)};

  &:hover {
    background-color: ${props => (props.disabled ? null : '#6d7288')};
  }
`;

const UserMenuItemText = styled.span<{ theme: ThemeType }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 800);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showUserMenu]);

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
    navigate({ to: '/authentication' });
  };

  const handleUserButtonClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      handleLogin();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    navigate({ to: '/about' });
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
        <Footer ref={userMenuRef}>
          {showUserMenu && user && (
            <UserMenu>
              <UserMenuItem disabled>
                <UserIcon size={16} />
                <UserMenuItemText>{user && user.email}</UserMenuItemText>
              </UserMenuItem>
              <UserMenuItem onClick={handleSettings}>
                <SettingsIcon size={16} />
                <UserMenuItemText>Settings</UserMenuItemText>
              </UserMenuItem>
              <UserMenuItem onClick={handleLogout}>
                <LogoutIcon size={16} />
                <UserMenuItemText>Logout</UserMenuItemText>
              </UserMenuItem>
            </UserMenu>
          )}
          <Button
            fullWidth
            size='medium'
            icon={<Avatar user={user} />}
            variant='primary'
            onClick={handleUserButtonClick}
          >
            {user ? user.displayName || user.email || 'User' : 'Login'}
          </Button>
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
