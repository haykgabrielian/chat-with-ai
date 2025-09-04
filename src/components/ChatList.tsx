import React from 'react';
import styled from 'styled-components';

import { PlusIcon, TrashIcon } from '@/components/icons';
import { Chat } from '@/types/common';

import { BACKGROUND_COLORS, BUTTON_COLORS, TEXT_COLORS } from '@/theme/colors';

type Props = {
  chats: Chat[];
  selectedChatId: string | null;
  selectChat: (chat: Chat | null) => void;
  removeChat: (chatId: string) => Promise<void>;
};

const Container = styled.div`
  width: 300px;
  background-color: ${BACKGROUND_COLORS.SIDEBAR};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 10px;
  flex-shrink: 0;
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
  color: ${TEXT_COLORS.PRIMARY};
`;

const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-top: 8px;
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
  background-color: ${BUTTON_COLORS.PRIMARY};
  color: ${TEXT_COLORS.WHITE};
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
    background-color: ${BUTTON_COLORS.PRIMARY_HOVER};
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

const NoChatsMessage = styled.p`
  color: ${TEXT_COLORS.PRIMARY};
  text-align: center;
  margin-top: 20px;
`;

const ChatList: React.FC<Props> = ({
  chats,
  selectedChatId,
  selectChat,
  removeChat,
}) => {
  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    removeChat(chatId);
  };

  return (
    <Container>
      <Header>
        <Title>
          <p>Chats</p>
          <NewChatButton onClick={() => selectChat(null)} title='New Chat'>
            <PlusIcon />
          </NewChatButton>
        </Title>
      </Header>
      <ChatListContainer>
        <List>
          {chats.length > 0 ? (
            [...chats]
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
            <NoChatsMessage>
              No chats available. Start a new one!
            </NoChatsMessage>
          )}
        </List>
      </ChatListContainer>
    </Container>
  );
};

export default ChatList;
