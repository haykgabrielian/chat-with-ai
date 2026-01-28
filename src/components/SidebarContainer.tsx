import React from 'react';
import styled from 'styled-components';

import { Chat } from '@/types/common';
import ChatList from '@/components/ChatList';
import SidebarMenu from '@/components/SidebarMenu';

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
        <SidebarMenu
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          selectChat={selectChat}
          selectedChatId={selectedChatId}
        />
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
