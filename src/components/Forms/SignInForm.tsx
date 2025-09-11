import React, { useState } from 'react';
import styled from 'styled-components';

import { BUTTON_COLORS, INPUT_COLORS, TEXT_COLORS } from '@/theme/colors';
import { GoogleIcon } from '@/components/icons';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${TEXT_COLORS.PRIMARY};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: ${INPUT_COLORS.BACKGROUND};
  border: 1px solid ${INPUT_COLORS.BORDER};
  border-radius: 8px;
  font-size: 1rem;
  color: ${TEXT_COLORS.PRIMARY};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${INPUT_COLORS.PLACEHOLDER};
  }
`;

const Button = styled.button`
  background: ${BUTTON_COLORS.PRIMARY};
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1rem;
  font-weight: 600;
  color: ${TEXT_COLORS.WHITE};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${BUTTON_COLORS.PRIMARY_HOVER};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${TEXT_COLORS.WHITE};
  border: 1px solid ${INPUT_COLORS.BORDER};
  border-radius: 8px;

  font-size: 1rem;
  font-weight: 600;
  color: ${TEXT_COLORS.SECONDARY};
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: ${TEXT_COLORS.SECONDARY};
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${INPUT_COLORS.BORDER};
  }

  &::before {
    margin-right: 16px;
  }

  &::after {
    margin-left: 16px;
  }
`;

const ToggleText = styled.p`
  margin: 0;
  text-align: center;
  color: ${TEXT_COLORS.SECONDARY};
  font-size: 0.9rem;
`;

const ToggleLink = styled.button`
  padding: 0;
  margin-left: 4px;
  background: none;
  border: none;
  color: ${BUTTON_COLORS.PRIMARY_HOVER};
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;

  &:hover {
    color: ${TEXT_COLORS.PRIMARY};
  }
`;

type Props = {
  onToggleToSignUp: () => void;
};

const SignInForm = ({ onToggleToSignUp }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempt:', { email, password });
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked');
  };

  return (
    <Form>
      <InputGroup>
        <Label htmlFor='signin-email'>Email</Label>
        <Input
          id='signin-email'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor='signin-password'>Password</Label>
        <Input
          id='signin-password'
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </InputGroup>

      <Button onClick={handleSubmit}>Sign In</Button>

      <Divider>or</Divider>

      <GoogleButton type='button' onClick={handleGoogleSignIn}>
        <GoogleIcon />
        Sign in with Google
      </GoogleButton>

      <ToggleText>
        Don't have an account?{' '}
        <ToggleLink onClick={onToggleToSignUp}>Sign Up</ToggleLink>
      </ToggleText>
    </Form>
  );
};

export default SignInForm;
