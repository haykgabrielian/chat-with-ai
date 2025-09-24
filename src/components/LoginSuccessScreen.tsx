import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';

import { SuccessIcon } from '@/components/icons';
import { ThemeType } from '@/helpers/themes';
import { User } from 'firebase/auth';

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const WelcomeMessage = styled.div<{ theme: ThemeType }>`
  text-align: center;
`;

const WelcomeTitle = styled.h2<{ theme: ThemeType }>`
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.text.white};
`;

const WelcomeText = styled.p<{ theme: ThemeType }>`
  margin: 0;
  font-size: 1rem;
  color: ${props => props.theme.text.secondary};
`;

const UserInfo = styled.div<{ theme: ThemeType }>`
  width: 100%;
  padding: 16px;
  background: ${props => props.theme.background.messageAI};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.input.border};
`;

const UserDetail = styled.div<{ theme: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const UserLabel = styled.span<{ theme: ThemeType }>`
  font-size: 0.9rem;
  color: ${props => props.theme.text.secondary};
  font-weight: 500;
`;

const UserValue = styled.span<{ theme: ThemeType }>`
  font-size: 0.9rem;
  color: ${props => props.theme.text.primary};
  font-weight: 400;
`;

const LoginSuccessScreen = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: '/' });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SuccessContainer>
      <SuccessIcon size={90} />
      <WelcomeMessage>
        <WelcomeTitle>Welcome!</WelcomeTitle>
        <WelcomeText>
          You have successfully signed in to your account.
        </WelcomeText>
      </WelcomeMessage>
      <UserInfo>
        <UserDetail>
          <UserLabel>Email:</UserLabel>
          <UserValue>{user?.email || 'N/A'}</UserValue>
        </UserDetail>
        <UserDetail>
          <UserLabel>Name:</UserLabel>
          <UserValue>{user?.displayName || 'N/A'}</UserValue>
        </UserDetail>
      </UserInfo>
    </SuccessContainer>
  );
};

export default LoginSuccessScreen;
