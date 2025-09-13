import styled from 'styled-components';
import { useState } from 'react';

import { useChats } from '@/hooks/useChats';

import ChatWindow from '@/components/ChatWindow';
import SidebarContainer from '@/components/SidebarContainer';

const Container = styled.div`
  display: flex;
  height: 100%;
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
      <SidebarContainer
        isOpen={isSidebarOpen}
        chats={chats}
        selectedChatId={selectedChat ? selectedChat.id : null}
        selectChat={selectChat}
        removeChat={removeChat}
        toggleSidebar={toggleSidebar}
      />
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
