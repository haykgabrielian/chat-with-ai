import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import { Chat, Msg, LoadingState } from "@/types/common";
import 'highlight.js/styles/monokai.css';

type Props = {
    selectedChat: Chat | null;
    sendMessage: (message: string) => void;
    createNewChat: (message: string) => void;
    loadingState: LoadingState;
};

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 150px;
    height: 100vh;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 50px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
    border-bottom: 1px solid #636363;
    color: #cfcfcf;
`;

const MessagesContainer = styled.div`
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const MessagesContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 16px;
`;

const Message = styled.div<{ isSentByMe: boolean }>`
    position: relative;
    width: max-content;
    max-width: 900px;
    background-color: ${(props) => (props.isSentByMe ? "#0084ff" : "#4e4e4e")};
    color: #cfcfcf;
    margin-left: ${(props) => (props.isSentByMe ? "auto" : "unset")};
    text-align: left;
    border-radius: 20px;
    padding: 8px;
    margin-top: 8px;
    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        bottom: -2px;
        ${(props) => (props.isSentByMe ? "right: -7px;" : "left: -7px;")}
        height: 20px;
        border-${(props) => (props.isSentByMe ? "right" : "left")}: 20px solid ${(props) => (props.isSentByMe ? "#0084ff" : "#4e4e4e")};
        border-bottom-${(props) => (props.isSentByMe ? "left" : "right")}-radius: 16px 14px;
        transform: translate(0, -2px);
    }

    &:after {
        content: "";
        position: absolute;
        z-index: ${(props) => (props.isSentByMe ? "1" : "3")};
        bottom: -2px;
        ${(props) => (props.isSentByMe ? "right: -56px;" : "left: 4px;")}
        width: 26px;
        height: 20px;
        background: #424242;
        border-bottom-${(props) => (props.isSentByMe ? "left" : "right")}-radius: 10px;
        transform: ${(props) => (props.isSentByMe ? "translate(-30px, -2px);" : "translate(-30px, -2px);")}
    }
`;

const TypingIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 16px;
    background-color: #4e4e4e;
    border-radius: 20px;
    width: fit-content;
    margin-top: 8px;
    margin-left: 0;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        bottom: -2px;
        left: -7px;
        height: 20px;
        border-left: 20px solid #4e4e4e;
        border-bottom-right-radius: 16px 14px;
        transform: translate(0, -2px);
    }
    &:after {
        content: "";
        position: absolute;
        z-index: 3;
        bottom: -2px;
        left: 4px;
        width: 26px;
        height: 20px;
        background: #424242;
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
        0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
        }
        30% {
            transform: translateY(-6px);
            opacity: 1;
        }
    }
`;

const NoMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    p {
        color: #cfcfcf;
        font-size: 30px;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    border-top: 1px solid #565869;
`;

const InputWrapper = styled.div`
    position: relative;
    max-width: 768px;
    margin: 0 auto;
    width: 100%;
`;

const Input = styled.textarea`
    width: 100%;
    min-height: 52px;
    max-height: 200px;
    padding: 14px 45px 14px 16px;
    background: #40414f;
    border-radius: 12px;
    color: #cfcfcf;
    font-size: 16px;
    line-height: 1.5;
    resize: none;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s ease;
    opacity: ${props => props.disabled ? 0.5 : 1};
    cursor: ${props => props.disabled ? 'not-allowed' : 'text'};
    
    &::placeholder {
        color: #8e8ea0;
    }
`;

const SendButton = styled.button`
    position: absolute;
    right: 8px;
    bottom: 14px;
    width: 32px;
    height: 32px;
    background: ${props => props.disabled ? '#565869' : '#10a37f'};
    border: none;
    border-radius: 6px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    
    svg {
        width: 16px;
        height: 16px;
        fill: #fff;
    }
`;

const MarkdownWrapper = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;

  h1, h2, h3, h4 {
    margin: 1rem 0 0.5rem;
    font-weight: 600;
    color: inherit;
  }

  p {
    margin: 0;
    color: inherit;
  }

  ul, ol {
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
    padding: 1em;
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

  th, td {
    border: 1px solid #aaa;
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

const ChatWindow: React.FC<Props> = ({ selectedChat, sendMessage, createNewChat, loadingState }) => {
    const [message, setMessage] = useState("");
    const messagesContentRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSend = () => {
        if (!message.trim() || loadingState.isLoading) return;
        if (!selectedChat) {
            createNewChat(message);
        } else {
            sendMessage(message);
        }
        setMessage("");
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !loadingState.isLoading) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        
        // Auto-resize textarea
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    };

    useEffect(() => {
        if (messagesContentRef.current) {
            const container = messagesContentRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [selectedChat?.messages.length, loadingState.isLoading]);

    return (
        <Container>
            <Header>{selectedChat ? selectedChat.name : "No Chat Selected"}</Header>
            <MessagesContainer>
                {selectedChat ? (
                    <MessagesContent ref={messagesContentRef}>
                        {selectedChat.messages.map((msg: Msg, index: number) => (
                            <Message key={index} isSentByMe={msg.sender === "Me"}>
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
                        {loadingState.isLoading && loadingState.currentChatId === selectedChat.id && (
                            <TypingIndicator>
                                <Dot delay={0} />
                                <Dot delay={0.2} />
                                <Dot delay={0.4} />
                            </TypingIndicator>
                        )}
                    </MessagesContent>
                ) : (
                    <NoMessage>
                        <p>What can I help with? Start a new chat by sending a message.</p>
                    </NoMessage>
                )}
            </MessagesContainer>

            <InputContainer>
                <InputWrapper>
                    <Input
                        ref={textareaRef}
                        value={message}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder={loadingState.isLoading ? "AI is thinking..." : "Message ChatGPT..."}
                        rows={1}
                        disabled={loadingState.isLoading}
                    />
                    <SendButton 
                        onClick={handleSend}
                        disabled={!message.trim() || loadingState.isLoading}
                        title="Send message"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision"
                             text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd"
                             clip-rule="evenodd" viewBox="0 0 511 512.32">
                            <path fill="#fff"
                                  d="M9.72 185.88L489.19 1.53c3.64-1.76 7.96-2.08 12.03-.53 7.83 2.98 11.76 11.74 8.78 19.57L326.47 502.56h-.02c-1.33 3.49-3.94 6.5-7.57 8.25-7.54 3.63-16.6.47-20.23-7.06l-73.78-152.97 146.67-209.97-209.56 146.3L8.6 213.64a15.117 15.117 0 01-7.6-8.25c-2.98-7.79.93-16.53 8.72-19.51z"/>
                        </svg>
                    </SendButton>
                </InputWrapper>
            </InputContainer>
        </Container>
    );
};

export default ChatWindow;