import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import { Chat, Msg } from "@/types/common";
import 'highlight.js/styles/monokai.css';

type Props = {
    selectedChat: Chat | null;
    sendMessage: (message: string) => void;
    createNewChat: (message: string) => void;
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
        -webkit-transform: translate(0, -2px);
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
        -webkit-transform: ${(props) => (props.isSentByMe ? "translate(-30px, -2px);" : "translate(-30px, -2px);")}
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
    align-items: center;
    justify-content: space-between;
    min-height: 90px;
    border-top: 1px solid #636363;
    padding: 8px 16px;
`;

const Input = styled.input`
    width: 100%;
    padding: 16px 8px;
    margin-right: 8px;
    background: transparent;
    color: #cfcfcf;
    border: 1px solid #cfcfcf;
    border-radius: 16px;
    outline: none;
    &::placeholder {
        color: #888;
    }
`;

const SendButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 14px;
    cursor: pointer;
    border-top: 1px solid #636363;
    outline: none;
    &:hover {
        background-color: #0056b3;
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

const ChatWindow: React.FC<Props> = ({ selectedChat, sendMessage, createNewChat }) => {
    const [message, setMessage] = useState("");
    const messagesContentRef = useRef<HTMLDivElement | null>(null);

    const handleSend = () => {
        if (!message.trim()) return;
        if (!selectedChat) {
            createNewChat(message);
        } else {
            sendMessage(message);
        }
        setMessage("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    useEffect(() => {
        if (messagesContentRef.current) {
            const container = messagesContentRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [selectedChat?.messages.length]);

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
                    </MessagesContent>
                ) : (
                    <NoMessage>
                        <p>What can I help with? Start a new chat by sending a message.</p>
                    </NoMessage>
                )}
            </MessagesContainer>

            <InputContainer>
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                />
                <SendButton onClick={handleSend}>Send</SendButton>
            </InputContainer>
        </Container>
    );
};

export default ChatWindow;