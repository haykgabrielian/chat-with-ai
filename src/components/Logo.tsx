import React from 'react';
import styled from 'styled-components';

import { LogoIcon } from '@/components/icons';

interface LogoProps {
  className?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const SIZES = {
  xs: '20px',
  sm: '32px',
  md: '40px',
  lg: '64px',
  xl: '80px',
};

const LogoContainer = styled.div<{ $size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: ${props => props.$size};
    height: ${props => props.$size};
  }
`;

const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeValue = SIZES[size];

  return (
    <LogoContainer className={className} $size={sizeValue}>
      <LogoIcon />
    </LogoContainer>
  );
};

export default Logo;
