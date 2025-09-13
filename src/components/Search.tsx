import React from 'react';
import styled from 'styled-components';

import { CloseIcon, SearchIcon } from '@/components/icons';
import { ThemeType } from '@/helpers/themes';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12px;
`;

const SearchInput = styled.input<{ theme: ThemeType }>`
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid ${props => props.theme.button.primary};
  border-radius: 8px;
  background-color: ${props => props.theme.background.sidebar};
  color: ${props => props.theme.text.primary};
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${props => props.theme.text.secondary};
  }
`;

const SearchIconContainer = styled.div<{ theme: ThemeType }>`
  position: absolute;
  left: 12px;
  top: 9px;
  color: ${props => props.theme.text.secondary};
  pointer-events: none;
`;

const ClearButton = styled.button<{ $show: boolean; theme: ThemeType }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.text.secondary};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: ${props => (props.$show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.text.primary};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

type Props = {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
};

const Search = ({
  query,
  onChange,
  onClear,
  placeholder = 'Search chats...',
}: Props) => {
  return (
    <SearchContainer>
      <SearchIconContainer>
        <SearchIcon size={16} />
      </SearchIconContainer>
      <SearchInput
        type='text'
        value={query}
        onChange={onChange}
        placeholder={placeholder}
      />
      <ClearButton
        $show={query.length > 0}
        onClick={onClear}
        title='Clear search'
      >
        <CloseIcon size={14} />
      </ClearButton>
    </SearchContainer>
  );
};

export default Search;
