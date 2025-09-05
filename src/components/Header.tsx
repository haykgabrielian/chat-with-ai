import React from 'react';
import styled from 'styled-components';

import { LoginIcon } from '@/components/icons';
import { BACKGROUND_COLORS, TEXT_COLORS } from '@/theme/colors';

type Props = {
  chatName: string;
  onLoginClick?: () => void;
};

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 50px;
  min-height: 50px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${TEXT_COLORS.PRIMARY};
  z-index: 1;
  backdrop-filter: blur(10px);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  color: ${TEXT_COLORS.PRIMARY};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${BACKGROUND_COLORS.MESSAGE_AI};
    color: ${TEXT_COLORS.WHITE};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Header = ({ chatName, onLoginClick }: Props) => {
  return (
    <HeaderContainer>
      <HeaderLeft>{chatName}</HeaderLeft>
      <HeaderRight>
        <LoginButton title="Login" onClick={onLoginClick}>
          <LoginIcon />
        </LoginButton>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
