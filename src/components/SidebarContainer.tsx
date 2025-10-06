import React from 'react';
import styled from 'styled-components';

import { HamburgerIcon } from '@/components/icons';

import { Chat } from '@/types/common';
import ChatList from '@/components/ChatList';
import { ThemeType } from '@/helpers/themes';

type Props = {
  isOpen: boolean;
  chats: Chat[];
  selectedChatId: string | null;
  selectChat: (chat: Chat | null) => void;
  removeChat: (chatId: string) => Promise<void>;
  togglePin: (chatId: string) => Promise<void>;
  toggleSidebar: () => void;
};

const Container = styled.div<{ $isOpen: boolean }>`
  position: relative;
  width: 250px;
  margin-left: ${props => (props.$isOpen ? '0' : '-250px')};
  transition: margin-left 0.2s ease;
  z-index: 7;

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 6;
  @media (max-width: 768px) {
    display: ${props => (props.$isOpen ? 'block' : 'none')};
  }
`;

const HamburgerButton = styled.button<{ theme: ThemeType }>`
  position: fixed;
  top: 20px;
  left: 10px;
  width: 38px;
  height: 38px;
  background-color: ${props => props.theme.button.primary};
  color: ${props => props.theme.text.white};
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
    background-color: ${props => props.theme.button.primaryHover};
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
  togglePin,
  toggleSidebar,
}: Props) => {
  return (
    <>
      <Container $isOpen={isOpen}>
        <HamburgerButton onClick={toggleSidebar}>
          <HamburgerIcon isOpen={isOpen} />
        </HamburgerButton>
        <ChatList
          chats={chats}
          selectChat={selectChat}
          selectedChatId={selectedChatId}
          removeChat={removeChat}
          togglePin={togglePin}
        />
      </Container>
      <Overlay onClick={toggleSidebar} $isOpen={isOpen} />
    </>
  );
};

export default SidebarContainer;
