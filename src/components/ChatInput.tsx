import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { GlobeIcon, SendIcon } from '@/components/icons';
import { ThemeType } from '@/helpers/themes';

type Props = {
  onSendMessage: (message: string, search: boolean) => void;
  isLoading: boolean;
  placeholder?: string;
};

const InputContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 920px;
  z-index: 5;
`;

const Input = styled.textarea<{ theme: ThemeType }>`
  width: 100%;
  min-height: 94px;
  max-height: 200px;
  padding: 14px 16px 54px 16px;
  background: ${props => props.theme.input.background};
  border-radius: 12px;
  color: ${props => props.theme.text.primary};
  font-size: 16px;
  line-height: 1.5;
  resize: none;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s ease;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'text')};

  &::placeholder {
    color: ${props => props.theme.input.placeholder};
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 15px;
  gap: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 14px;
`;

const SearchButton = styled.button<{ theme: ThemeType; $isSearch: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 10px;
  background-color: ${props =>
    props.$isSearch ? props.theme.status.success : props.theme.button.primary};
  color: ${props => props.theme.text.white};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  white-space: nowrap;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover:not(:disabled) {
    background-color: ${props =>
      props.$isSearch
        ? props.theme.status.success
        : props.theme.button.primaryHover};
  }
`;

const SendButton = styled.button<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${props =>
    props.disabled ? props.theme.button.primary : props.theme.status.success};
  border: none;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
    fill: ${props => props.theme.text.white};
  }
`;

const ChatInput = ({
  onSendMessage,
  isLoading,
  placeholder = 'Message to ZruyC...',
}: Props) => {
  const [message, setMessage] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    onSendMessage(message, isSearch);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleSearchClick = () => {
    setIsSearch(!isSearch);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

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

      <ButtonContainer>
        <SearchButton
          onClick={handleSearchClick}
          disabled={isLoading}
          $isSearch={isSearch}
        >
          <GlobeIcon />
          Search
        </SearchButton>

        <SendButton
          onClick={handleSend}
          disabled={!message.trim() || isLoading}
          title='Send message'
        >
          <SendIcon />
        </SendButton>
      </ButtonContainer>
    </InputContainer>
  );
};

export default ChatInput;
