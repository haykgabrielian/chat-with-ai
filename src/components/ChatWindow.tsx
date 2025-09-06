import 'highlight.js/styles/monokai.css';

import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

import { Chat, LoadingState, Msg } from '@/types/common';
import ChatInput from '@/components/ChatInput';
import EmptyState from '@/components/EmptyState';

import {
  BACKGROUND_COLORS,
  MESSAGE_BUBBLE_COLORS,
  TEXT_COLORS,
} from '@/theme/colors';

type Props = {
  selectedChat: Chat | null;
  sendMessage: (message: string) => void;
  createNewChat: (message: string) => void;
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
  padding-bottom: 100px;
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

const Message = styled.div<{ isSentByMe: boolean }>`
    position: relative;
    width: max-content;
    max-width: 850px;
    background-color: ${props => (props.isSentByMe ? BACKGROUND_COLORS.MESSAGE_USER : BACKGROUND_COLORS.MESSAGE_AI)};
    color: ${TEXT_COLORS.PRIMARY};
    margin-left: ${props => (props.isSentByMe ? 'auto' : 'unset')};
    text-align: left;
    border-radius: 20px;
    padding: 8px;
    margin-top: 8px;
    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        bottom: -2px;
        ${props => (props.isSentByMe ? 'right: -7px;' : 'left: -7px;')}
        height: 20px;
        border-${props => (props.isSentByMe ? 'right' : 'left')}: 20px solid ${props => (props.isSentByMe ? BACKGROUND_COLORS.MESSAGE_USER : BACKGROUND_COLORS.MESSAGE_AI)};
        border-bottom-${props => (props.isSentByMe ? 'left' : 'right')}-radius: 16px 14px;
        transform: translate(0, -2px);
    }

    &:after {
        content: "";
        position: absolute;
        z-index: ${props => (props.isSentByMe ? '1' : '3')};
        bottom: -2px;
        ${props => (props.isSentByMe ? 'right: -56px;' : 'left: 4px;')}
        width: 26px;
        height: 20px;
        background: ${MESSAGE_BUBBLE_COLORS.BACKGROUND};
        border-bottom-${props => (props.isSentByMe ? 'left' : 'right')}-radius: 10px;
        transform: ${props => (props.isSentByMe ? 'translate(-30px, -2px);' : 'translate(-30px, -2px);')}
    }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background-color: ${BACKGROUND_COLORS.TYPING_INDICATOR};
  border-radius: 20px;
  width: fit-content;
  margin-top: 8px;
  margin-left: 0;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: -2px;
    left: -7px;
    height: 20px;
    border-left: 20px solid ${BACKGROUND_COLORS.TYPING_INDICATOR};
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
    background: ${MESSAGE_BUBBLE_COLORS.BACKGROUND};
    border-bottom-right-radius: 10px;
    transform: translate(-30px, -2px);
  }
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  background-color: #cfcfcf;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;

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

const MarkdownWrapper = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;

  h1,
  h2,
  h3,
  h4 {
    margin: 1rem 0 0.5rem;
    font-weight: 600;
    color: inherit;
  }

  p {
    margin: 0;
    color: inherit;
  }

  ul,
  ol {
    margin-left: 1.25rem;
    margin-bottom: 0.75rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  code {
    font-family: monospace;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  pre {
    background: rgba(0, 0, 0, 0.2);
    padding: 4px;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 0.8rem;
    margin: 1rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.8rem;
    border: 1px solid #ccc;
  }

  th,
  td {
    border: 1px solid #666;
    padding: 0.5rem;
    text-align: left;
  }

  thead {
    background-color: rgba(255, 255, 255, 0.1);
  }

  blockquote {
    border-left: 4px solid #88b3ff;
    padding-left: 1rem;
    background: rgba(255, 255, 255, 0.05);
    font-style: italic;
    margin: 1rem 0;
    border-radius: 4px;
  }

  a {
    color: #a5c8ff;
    text-decoration: underline;
  }

  hr {
    border: none;
    border-top: 1px solid #666;
    margin: 1rem 0;
  }
`;

const ChatWindow = ({
  selectedChat,
  sendMessage,
  createNewChat,
  loadingState,
}: Props) => {
  const messagesContentRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = (message: string) => {
    if (!selectedChat) {
      createNewChat(message);
    } else {
      sendMessage(message);
    }
  };

  useEffect(() => {
    if (messagesContentRef.current) {
      const container = messagesContentRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [selectedChat?.messages.length, loadingState.isLoading]);

  return (
    <Container>
      <Content ref={messagesContentRef}>
          {selectedChat ? (
            <MessagesContainer>
              {selectedChat.messages.map((msg: Msg, index: number) => (
                <Message key={index} isSentByMe={msg.sender === 'Me'}>
                  <MarkdownWrapper>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </MarkdownWrapper>
                </Message>
              ))}
              {loadingState.isLoading &&
                loadingState.currentChatId === selectedChat.id && (
                  <TypingIndicator>
                    <Dot delay={0} />
                    <Dot delay={0.2} />
                    <Dot delay={0.4} />
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
