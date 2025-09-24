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
  onToggleToSignIn: () => void;
  onSignUp: (email: string, password: string) => void;
  onGoogleSignUp: () => void;
  onGithubSignUp: () => void;
  loading: string;
};

const SignUpForm = ({
  onToggleToSignIn,
  onSignUp,
  onGoogleSignUp,
  onGithubSignUp,
  loading,
}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    if (!confirmPassword) {
      return 'Please confirm your password';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
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
    if (errors.confirmPassword && confirmPassword) {
      newErrors.confirmPassword = '';
    }
    setErrors(newErrors);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (errors.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: '',
      }));
    }
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

  const handleConfirmPasswordBlur = () => {
    setErrors(prev => ({
      ...prev,
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!emailError && !passwordError && !confirmPasswordError) {
      onSignUp(email, password);
    }
  };

  const isFormValid =
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    email &&
    password &&
    confirmPassword;

  return (
    <Form>
      <InputGroup>
        <Label htmlFor='signup-email'>Email</Label>
        <Input
          id='signup-email'
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          $hasError={!!errors.email}
          required
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor='signup-password'>Password</Label>
        <Input
          id='signup-password'
          type='password'
          placeholder='Create a password'
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          $hasError={!!errors.password}
          required
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor='signup-confirm-password'>Confirm Password</Label>
        <Input
          id='signup-confirm-password'
          type='password'
          placeholder='Confirm your password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          $hasError={!!errors.confirmPassword}
          required
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}
      </InputGroup>

      <Button
        fullWidth
        size='large'
        variant='primary'
        disabled={!isFormValid}
        onClick={handleSubmit}
        icon={loading === 'email' ? <Loader size={20} /> : null}
      >
        Sign Up
      </Button>

      <Divider>or</Divider>

      <Button
        fullWidth
        size='large'
        variant='secondary'
        onClick={onGoogleSignUp}
        icon={loading === 'google' ? <Loader size={20} /> : <GoogleIcon />}
      >
        Google
      </Button>

      <Button
        fullWidth
        size='large'
        variant='secondary'
        onClick={onGithubSignUp}
        icon={loading === 'github' ? <Loader size={20} /> : <GithubIcon />}
      >
        Github
      </Button>

      <ToggleText>
        Already have an account?{' '}
        <ToggleLink onClick={onToggleToSignIn}>Sign In</ToggleLink>
      </ToggleText>
    </Form>
  );
};

export default SignUpForm;
