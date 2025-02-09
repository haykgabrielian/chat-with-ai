import styled from "styled-components";
import { useChats } from "../hooks/useChats";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const Container = styled.div`
    display: flex;
    height: 100%;
`;

const Home = () => {
    const { chats, selectedChat, selectChat, createNewChat, sendMessage } = useChats();

    return (
        <Container>
            <ChatList chats={chats} selectChat={selectChat} selectedChatId={selectedChat ? selectedChat.id : null } />
            <ChatWindow
                selectedChat={selectedChat}
                sendMessage={sendMessage}
                createNewChat={createNewChat}
            />
        </Container>
    );
};

export default Home;