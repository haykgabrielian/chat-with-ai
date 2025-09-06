import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { SendIcon } from '@/components/icons';

import {
  BUTTON_COLORS,
  INPUT_COLORS,
  STATUS_COLORS,
  TEXT_COLORS,
} from '@/theme/colors';

type Props = {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
};

const InputContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 768px;
`;

const Input = styled.textarea`
  width: 100%;
  min-height: 52px;
  max-height: 200px;
  padding: 14px 45px 14px 16px;
  background: ${INPUT_COLORS.BACKGROUND};
  border-radius: 12px;
  color: ${TEXT_COLORS.PRIMARY};
  font-size: 16px;
  line-height: 1.5;
  resize: none;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s ease;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'text')};

  &::placeholder {
    color: ${INPUT_COLORS.PLACEHOLDER};
  }
`;

const SendButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 15px;
  width: 32px;
  height: 32px;
  background: ${props =>
    props.disabled ? BUTTON_COLORS.PRIMARY : STATUS_COLORS.SUCCESS};
  border: none;
  border-radius: 6px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
    fill: ${TEXT_COLORS.WHITE};
  }
`;

const ChatInput = ({
  onSendMessage,
  isLoading,
  placeholder = 'Message to ZruyC...',
}: Props) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    onSendMessage(message);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
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

  return (
    <InputContainer>
      <Input
        ref={textareaRef}
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={isLoading ? 'ZruyC is thinking...' : placeholder}
        rows={1}
        disabled={isLoading}
      />
      <SendButton
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        title='Send message'
      >
        <SendIcon />
      </SendButton>
    </InputContainer>
  );
};

export default ChatInput;
