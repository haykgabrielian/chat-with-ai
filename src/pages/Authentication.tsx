import React, { useState } from 'react';

import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';

import Logo from '@/components/Logo';
import SignInForm from '@/components/Forms/SignInForm';
import SignUpForm from '@/components/Forms/SignUpForm';
import { ThemeType } from '@/helpers/themes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const AuthCard = styled.div<{ theme: ThemeType }>`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  background: ${props => props.theme.background.sidebar};
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.background.messageAI};
`;

const Title = styled.h1<{ theme: ThemeType }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.text.white};
  text-align: center;
`;

const Subtitle = styled.p<{ theme: ThemeType }>`
  margin-top: 8px;
  font-size: 1rem;
  color: ${props => props.theme.text.secondary};
  text-align: center;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 10px;
  cursor: pointer;
  z-index: 10;
`;

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleToggleToSignUp = () => {
    setIsSignUp(true);
  };

  const handleToggleToSignIn = () => {
    setIsSignUp(false);
  };

  const handleLogoClick = () => {
    navigate({ to: '/' });
  };

  return (
    <Container>
      <AuthCard>
        <LogoContainer onClick={handleLogoClick} title='Go to Home'>
          <Logo size='sm' />
        </LogoContainer>
        <Title>{isSignUp ? 'Create Account' : 'Welcome Back'}</Title>
        <Subtitle>
          {isSignUp
            ? 'Sign up to get started with your account'
            : 'Sign in to your account to continue'}
        </Subtitle>

        {isSignUp ? (
          <SignUpForm onToggleToSignIn={handleToggleToSignIn} />
        ) : (
          <SignInForm onToggleToSignUp={handleToggleToSignUp} />
        )}
      </AuthCard>
    </Container>
  );
};

export default Authentication;
