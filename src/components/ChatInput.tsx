import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { GlobeIcon, SendIcon } from '@/components/icons';
import Loader from '@/components/Loader';
import { ThemeType } from '@/helpers/themes';

type Props = {
  onSendMessage: (message: string, search: boolean) => void;
  isLoading: boolean;
  placeholder?: string;
  selectedQuestion: string;
  onQuestionChange: (question: string) => void;
};

const InputContainer = styled.div<{ theme: ThemeType }>`
  position: absolute;
  bottom: 20px;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 920px;
  transform: translateX(-50%);
  border-radius: 12px;
  background: ${props => props.theme.input.background};
  border: 1px solid ${props => props.theme.button.primary};
  z-index: 5;
`;

const Input = styled.textarea<{ theme: ThemeType }>`
  width: 100%;
  max-height: 150px;
  padding: 10px 14px 8px 14px;
  background: transparent;
  color: ${props => props.theme.text.primary};
  font-size: 16px;
  border: none;
  line-height: 1.5;
  resize: none;
  outline: none;
  font-family: inherit;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'text')};

  &::placeholder {
    color: ${props => props.theme.input.placeholder};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 8px 14px 10px 14px;
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
    width: 14px;
    height: 14px;
    fill: ${props => props.theme.text.white};
  }
`;

const ChatInput = ({
  onSendMessage,
  isLoading,
  placeholder = 'Message to ZruyC...',
  selectedQuestion,
  onQuestionChange,
}: Props) => {
  const [message, setMessage] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setMessage(selectedQuestion);
  }, [selectedQuestion]);

  useEffect(() => {
    if (isLoading) return;
    textareaRef.current?.focus();
  }, [isLoading]);

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    onQuestionChange('');
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
          {isLoading ? <Loader size={20} /> : <SendIcon />}
        </SendButton>
      </ButtonContainer>
    </InputContainer>
  );
};

export default ChatInput;
