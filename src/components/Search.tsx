import React from 'react';
import styled from 'styled-components';

import { CloseIcon, SearchIcon } from '@/components/icons';

import { BACKGROUND_COLORS, BUTTON_COLORS, TEXT_COLORS } from '@/theme/colors';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid ${BUTTON_COLORS.PRIMARY};
  border-radius: 8px;
  background-color: ${BACKGROUND_COLORS.SIDEBAR};
  color: ${TEXT_COLORS.PRIMARY};
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${TEXT_COLORS.SECONDARY};
  }
`;

const SearchIconContainer = styled.div`
  position: absolute;
  left: 12px;
  top: 9px;
  color: ${TEXT_COLORS.SECONDARY};
  pointer-events: none;
`;

const ClearButton = styled.button<{ show: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${TEXT_COLORS.SECONDARY};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${TEXT_COLORS.PRIMARY};
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
        show={query.length > 0}
        onClick={onClear}
        title='Clear search'
      >
        <CloseIcon size={14} />
      </ClearButton>
    </SearchContainer>
  );
};

export default Search;
