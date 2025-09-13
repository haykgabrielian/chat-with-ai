import React from 'react';
import { ThemeType } from '@/helpers/themes';
import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const StyledButton = styled.button<{
  theme: ThemeType;
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: 500;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  ${props => {
    switch (props.$size) {
      case 'small':
        return `
          min-width: 80px;
          min-height: 30px;
          padding: 6px 12px;
          font-size: 12px;
        `;
      case 'large':
        return ` 
          min-width: 140px;
          min-height: 40px;
          padding: 10px 24px;
          font-size: 16px;
        `;
      case 'medium':
      default:
        return `
          min-width: 120px;
          min-height: 36px;
          padding: 8px 20px;
          font-size: 14px;
        `;
    }
  }}

  width: ${props => (props.$fullWidth ? '100%' : 'auto')};

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: ${props.theme.button.primary};
          color: ${props.theme.text.white};
          &:hover:not(:disabled) {
            background-color: ${props.theme.button.primaryHover};
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'danger':
        return `
          background-color: ${props.theme.button.primary};
          color: ${props.theme.text.white};
          &:hover:not(:disabled) {
            background-color: ${props.theme.button.primaryHover};
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return `
          background-color: transparent;
          color: ${props.theme.text.secondary};
          border: 1px solid ${props.theme.text.secondary};
          &:hover:not(:disabled) {
            background-color: ${props.theme.background.chatItemHover};
            color: ${props.theme.text.primary};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${props.theme.text.secondary};
          &:hover:not(:disabled) {
            background-color: ${props.theme.background.chatItemHover};
            color: ${props.theme.text.primary};
          }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    width: ${props => {
      switch (props.$size) {
        case 'small':
          return '14px';
        case 'large':
          return '20px';
        case 'medium':
        default:
          return '16px';
      }
    }};
    height: ${props => {
      switch (props.$size) {
        case 'small':
          return '14px';
        case 'large':
          return '20px';
        case 'medium':
        default:
          return '16px';
      }
    }};
    stroke: currentColor;
    fill: none;
  }
`;

const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      {...props}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};

export default Button;
