import React, { useContext } from 'react';
import styled from 'styled-components';

import { MoonIcon, SunIcon } from './icons';
import { ThemeToggleContext } from '@/context//ThemeContext';
import { ThemeType } from '@/helpers/themes';

const StyledButton = styled.button<{ theme: ThemeType }>`
  width: 22px;
  height: 22px;
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
    stroke: currentColor;
  }
`;

interface Props {
  className?: string;
}

const ThemeToggleButton = ({ className }: Props) => {
  const { toggleTheme, isDarkMode } = useContext(ThemeToggleContext);

  return (
    <StyledButton className={className} onClick={toggleTheme}>
      {isDarkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </StyledButton>
  );
};

export default ThemeToggleButton;
