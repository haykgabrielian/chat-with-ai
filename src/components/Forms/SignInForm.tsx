import React, { useState } from 'react';
import styled from 'styled-components';

import { GithubIcon, GoogleIcon } from '@/components/icons';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { ThemeType } from '@/helpers/themes';
import isValidEmail from '@/helpers/isValidEmail';

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

const Label = styled.label<{ theme: ThemeType }>`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.text.primary};
`;

const Input = styled.input<{ theme: ThemeType; $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  background: ${props => props.theme.input.background};
  border: 1px solid
    ${props => (props.$hasError ? '#e74c3c' : props.theme.input.border)};
  border-radius: 8px;
  font-size: 1rem;
  color: ${props => props.theme.text.primary};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${props => props.theme.input.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${props =>
      props.$hasError ? '#e74c3c' : props.theme.button.primaryHover};
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: #e74c3c;
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
  onToggleToSignUp: () => void;
  onSignIn: (email: string, password: string) => void;
  onGoogleSignUp: () => void;
  onGithubSignUp: () => void;
  loading: string;
};

const SignInForm = ({
  onToggleToSignUp,
  onSignIn,
  onGithubSignUp,
  onGoogleSignUp,
  loading,
}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    }
    if (!isValidEmail(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: '',
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const newErrors = { ...errors };
    if (errors.password) {
      newErrors.password = '';
    }

    setErrors(newErrors);
  };

  const handleEmailBlur = () => {
    setErrors(prev => ({
      ...prev,
      email: validateEmail(email),
    }));
  };

  const handlePasswordBlur = () => {
    setErrors(prev => ({
      ...prev,
      password: validatePassword(password),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      onSignIn(email, password);
    }
  };

  const isFormValid = !errors.email && !errors.password && email && password;

  return (
    <Form>
      <InputGroup>
        <Label htmlFor='signin-email'>Email</Label>
        <Input
          id='signin-email'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          required
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor='signin-password'>Password</Label>
        <Input
          id='signin-password'
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          required
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </InputGroup>

      <Button
        fullWidth
        size='large'
        variant='primary'
        disabled={!isFormValid}
        onClick={handleSubmit}
        icon={loading === 'email' ? <Loader size={20} /> : null}
      >
        Sign In
      </Button>

      <Divider>or</Divider>

      <Button
        fullWidth
        icon={loading === 'google' ? <Loader size={20} /> : <GoogleIcon />}
        size='large'
        variant='secondary'
        onClick={onGoogleSignUp}
      >
        Google
      </Button>

      <Button
        fullWidth
        icon={loading === 'github' ? <Loader size={20} /> : <GithubIcon />}
        size='large'
        variant='secondary'
        onClick={onGithubSignUp}
      >
        Github
      </Button>

      <ToggleText>
        Don't have an account?{' '}
        <ToggleLink onClick={onToggleToSignUp}>Sign Up</ToggleLink>
      </ToggleText>
    </Form>
  );
};

export default SignInForm;
