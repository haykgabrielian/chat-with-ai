import React from 'react';
import styled from 'styled-components';

import { HamburgerIcon } from '@/components/icons';

import { Chat } from '@/types/common';
import ChatList from '@/components/ChatList';

import { BUTTON_COLORS, TEXT_COLORS } from '@/theme/colors';

type Props = {
  isOpen: boolean;
  chats: Chat[];
  selectedChatId: string | null;
  selectChat: (chat: Chat | null) => void;
  removeChat: (chatId: string) => Promise<void>;
  toggleSidebar: () => void;
};

const Container = styled.div<{ isOpen: boolean }>`
  width: 250px;
  transition: margin-left 0.2s ease;
  margin-left: ${props => (props.isOpen ? '0' : '-250px')};
  position: relative;
`;

const HamburgerButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  top: 20px;
  left: 10px;
  width: 22px;
  height: 22px;
  background-color: ${BUTTON_COLORS.PRIMARY};
  color: ${TEXT_COLORS.WHITE};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  z-index: 10;
  padding: 8px;

  &:hover {
    background-color: ${BUTTON_COLORS.PRIMARY_HOVER};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`;

const SidebarContainer = ({
  isOpen,
  chats,
  selectedChatId,
  selectChat,
  removeChat,
  toggleSidebar,
}: Props) => {
  return (
    <Container isOpen={isOpen}>
      <HamburgerButton onClick={toggleSidebar} isOpen={isOpen}>
        <HamburgerIcon isOpen={isOpen} />
      </HamburgerButton>
      <ChatList
        chats={chats}
        selectChat={selectChat}
        selectedChatId={selectedChatId}
        removeChat={removeChat}
      />
    </Container>
  );
};

export default SidebarContainer;
