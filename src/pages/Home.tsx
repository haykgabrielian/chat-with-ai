import styled from 'styled-components';
import { useState } from 'react';
import { useChats } from '@/hooks/useChats';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import { BACKGROUND_COLORS, TEXT_COLORS, BUTTON_COLORS } from '@/theme/colors';
import { ChevronLeftIcon } from '@/components/icons';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  transition: margin-left 0.3s ease;
  margin-left: ${props => (props.isOpen ? '0' : '-300px')};
  position: relative;
`;

const ToggleButton = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: 20px;
  right: -40px;
  width: 40px;
  height: 40px;
  background-color: ${BACKGROUND_COLORS.SIDEBAR};
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${TEXT_COLORS.PRIMARY};
  transition: background-color 0.2s ease;
  z-index: 10;

  &:hover {
    background-color: ${BUTTON_COLORS.PRIMARY};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
    transition: transform 0.3s ease;
    transform: rotate(${props => (props.isOpen ? '0deg' : '180deg')});
  }
`;

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    chats,
    selectedChat,
    loadingState,
    selectChat,
    createNewChat,
    sendMessage,
    removeChat,
  } = useChats();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container>
      <SidebarContainer isOpen={isSidebarOpen}>
        <ChatList
          chats={chats}
          selectChat={selectChat}
          selectedChatId={selectedChat ? selectedChat.id : null}
          removeChat={removeChat}
        />
        <ToggleButton onClick={toggleSidebar} isOpen={isSidebarOpen}>
          <ChevronLeftIcon />
        </ToggleButton>
      </SidebarContainer>
      <ChatWindow
        selectedChat={selectedChat}
        sendMessage={sendMessage}
        createNewChat={createNewChat}
        loadingState={loadingState}
      />
    </Container>
  );
};

export default Home;
