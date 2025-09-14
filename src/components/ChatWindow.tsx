import React, { useEffect, useRef } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

import { Chat, LoadingState, Msg } from '@/types/common';
import ChatInput from '@/components/ChatInput';
import { ThemeType } from '@/helpers/themes';
import styled from 'styled-components';

import EmptyState from '@/components/EmptyState';
import { ShareIcon } from '@/components/icons';
import ThemeToggleButton from '@/components/ThemeSwitch';

type Props = {
  selectedChat: Chat | null;
  sendMessage: (message: string, search: boolean) => void;
  createNewChat: (message: string, search: boolean) => void;
  loadingState: LoadingState;
};

const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow: scroll;
  padding-bottom: 130px;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 16px;
  width: 950px;
  margin: 0 auto;
`;

const Message = styled.div<{ $isSentByMe: boolean; theme: ThemeType }>`
    position: relative;
    width: max-content;
    max-width: 850px;
    background-color: ${props => (props.$isSentByMe ? props.theme.background.messageUser : props.theme.background.messageAI)};
    color: ${props => props.theme.text.primary};
    margin-left: ${props => (props.$isSentByMe ? 'auto' : 'unset')};
    text-align: left;
    border-radius: 20px;
    padding: 8px;
    margin-top: 8px;
    z-index: 1;
    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        bottom: -2px;
        ${props => (props.$isSentByMe ? 'right: -7px;' : 'left: -7px;')}
        height: 20px;
        border-${props => (props.$isSentByMe ? 'right' : 'left')}: 20px solid ${props => (props.$isSentByMe ? props.theme.background.messageUser : props.theme.background.messageAI)};
        border-bottom-${props => (props.$isSentByMe ? 'left' : 'right')}-radius: 16px 14px;
        transform: translate(0, -2px);
    }

    &:after {
        content: "";
        position: absolute;
        z-index: ${props => (props.$isSentByMe ? '1' : '3')};
        bottom: -2px;
        ${props => (props.$isSentByMe ? 'right: -56px;' : 'left: 4px;')}
        width: 26px;
        height: 20px;
        background: ${props => props.theme.messageBubble.background};
        border-bottom-${props => (props.$isSentByMe ? 'left' : 'right')}-radius: 10px;
        transform: ${props => (props.$isSentByMe ? 'translate(-30px, -2px);' : 'translate(-30px, -2px);')}
    }
`;

const TypingIndicator = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background-color: ${props => props.theme.background.typingIndicator};
  border-radius: 20px;
  width: fit-content;
  margin-top: 8px;
  margin-left: 0;
  position: relative;
  z-index: 0;
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: -2px;
    left: -7px;
    height: 20px;
    border-left: 20px solid ${props => props.theme.background.typingIndicator};
    border-bottom-right-radius: 16px 14px;
    transform: translate(0, -2px);
  }
  &:after {
    content: '';
    position: absolute;
    z-index: 3;
    bottom: -2px;
    left: 4px;
    width: 26px;
    height: 20px;
    background: ${props => props.theme.messageBubble.background};
    border-bottom-right-radius: 10px;
    transform: translate(-30px, -2px);
  }
`;

const Dot = styled.div<{ $delay: number; theme: ThemeType }>`
  width: 8px;
  height: 8px;
  background-color: ${props => props.theme.text.secondary};
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
  animation-delay: ${props => props.$delay}s;

  @keyframes typing {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-6px);
      opacity: 1;
    }
  }
`;

const StyledThemeToggleButton = styled(ThemeToggleButton)`
  position: fixed;
  top: 20px;
  right: 10px;
`;

const ShareButton = styled.button<{ theme: ThemeType }>`
  position: fixed;
  top: 20px;
  right: 55px;
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

const ChatWindow = ({
  selectedChat,
  sendMessage,
  createNewChat,
  loadingState,
}: Props) => {
  const messagesContentRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = (message: string, search: boolean) => {
    if (!selectedChat) {
      createNewChat(message, search);
    } else {
      sendMessage(message, search);
    }
  };

  useEffect(() => {
    if (messagesContentRef.current) {
      const container = messagesContentRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [selectedChat?.messages.length, selectedChat?.id, loadingState.isLoading]);

  return (
    <Container>
      <StyledThemeToggleButton />
      {selectedChat && (
        <ShareButton>
          <ShareIcon />
        </ShareButton>
      )}
      <Content ref={messagesContentRef}>
        {selectedChat ? (
          <MessagesContainer>
            {selectedChat.messages.map((msg: Msg, index: number) => (
              <Message key={index} $isSentByMe={msg.sender === 'Me'}>
                <MarkdownRenderer>{msg.text}</MarkdownRenderer>
              </Message>
            ))}
            {loadingState.isLoading &&
              !loadingState.isStreaming &&
              loadingState.currentChatId === selectedChat.id && (
                <TypingIndicator>
                  <Dot $delay={0} />
                  <Dot $delay={0.2} />
                  <Dot $delay={0.4} />
                </TypingIndicator>
              )}
          </MessagesContainer>
        ) : (
          <EmptyState />
        )}
      </Content>
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={loadingState.isLoading}
      />
    </Container>
  );
};

export default ChatWindow;
