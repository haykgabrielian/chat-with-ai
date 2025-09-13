import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import { GoogleIcon } from '@/components/icons';
import { ThemeType } from '@/helpers/themes';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label<{ theme: ThemeType }>`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.text.primary};
`;

const Input = styled.input<{ theme: ThemeType }>`
  width: 100%;
  padding: 12px 16px;
  background: ${props => props.theme.input.background};
  border: 1px solid ${props => props.theme.input.border};
  border-radius: 8px;
  font-size: 1rem;
  color: ${props => props.theme.text.primary};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${props => props.theme.input.placeholder};
  }
`;

const Divider = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  margin: 15px 0;
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.input.border};
  }

  &::before {
    margin-right: 16px;
  }

  &::after {
    margin-left: 16px;
  }
`;

const ToggleText = styled.p<{ theme: ThemeType }>`
  margin: 0;
  text-align: center;
  color: ${props => props.theme.text.secondary};
  font-size: 0.9rem;
`;

const ToggleLink = styled.button<{ theme: ThemeType }>`
  padding: 0;
  margin-left: 4px;
  background: none;
  border: none;
  color: ${props => props.theme.button.primaryHover};
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;

  &:hover {
    color: ${props => props.theme.text.primary};
  }
`;

type Props = {
  onToggleToSignIn: () => void;
};

const SignUpForm = ({ onToggleToSignIn }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up attempt:', { email, password, confirmPassword });
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign-up clicked');
  };

  return (
    <Form>
      <InputGroup>
        <Label htmlFor='signup-email'>Email</Label>
        <Input
          id='signup-email'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor='signup-password'>Password</Label>
        <Input
          id='signup-password'
          type='password'
          placeholder='Create a password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor='signup-confirm-password'>Confirm Password</Label>
        <Input
          id='signup-confirm-password'
          type='password'
          placeholder='Confirm your password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </InputGroup>

      <Button fullWidth size='large' variant='primary' onClick={handleSubmit}>
        Sign In
      </Button>

      <Divider>or</Divider>

      <Button
        fullWidth
        icon={<GoogleIcon />}
        size='large'
        variant='secondary'
        onClick={handleGoogleSignUp}
      >
        Sign up with Google
      </Button>

      <ToggleText>
        Already have an account?{' '}
        <ToggleLink onClick={onToggleToSignIn}>Sign In</ToggleLink>
      </ToggleText>
    </Form>
  );
};

export default SignUpForm;
