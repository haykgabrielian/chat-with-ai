import React from 'react';
import styled from 'styled-components';

import { HamburgerIcon, PlusIcon, SearchIcon } from '@/components/icons';

import { Chat } from '@/types/common';
import { ThemeType } from '@/helpers/themes';

type Props = {
  isOpen: boolean;
  toggleSidebar: () => void;
  selectChat: (chat: Chat | null) => void;
  selectedChatId: string | null;
};

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

const FloatingActions = styled.div`
  position: fixed;
  top: 20px;
  left: 56px;
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const ActionButton = styled.button<{
  theme: ThemeType;
  $isSidebarOpen: boolean;
  $disabled?: boolean;
}>`
  width: 38px;
  height: 38px;
  background-color: ${props =>
    props.$disabled
      ? props.theme.button.primaryBgHover
      : props.theme.button.primary};
  color: ${props =>
    props.$isSidebarOpen ? props.theme.text.primary : props.theme.text.white};
  border: none;
  border-radius: 8px;
  cursor: ${props => (props.$disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.$disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  padding: 8px;

  &:hover {
    background-color: ${props =>
      props.$disabled
        ? props.theme.button.primaryBgHover
        : props.theme.button.primaryHover};
  }
`;

const SidebarMenu = ({
  isOpen,
  toggleSidebar,
  selectChat,
  selectedChatId,
}: Props) => {
  const handleCreateNewChat = () => {
    selectChat(null);
  };

  const handleSearch = () => {
    if (!isOpen) toggleSidebar();
    window.setTimeout(() => {
      document.getElementById('chat-search-input')?.focus();
    }, 0);
  };

  return (
    <>
      <HamburgerButton onClick={toggleSidebar}>
        <HamburgerIcon isOpen={isOpen} />
      </HamburgerButton>
      {!isOpen && (
        <FloatingActions>
          <ActionButton
            onClick={handleSearch}
            title='Search chats'
            $isSidebarOpen={isOpen}
          >
            <SearchIcon size={16} />
          </ActionButton>
          <ActionButton
            onClick={handleCreateNewChat}
            title='New chat'
            $isSidebarOpen={isOpen}
            $disabled={!selectedChatId}
            disabled={!selectedChatId}
          >
            <PlusIcon size={16} />
          </ActionButton>
        </FloatingActions>
      )}
    </>
  );
};

export default SidebarMenu;
