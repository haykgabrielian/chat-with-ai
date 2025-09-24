import React from 'react';

import styled from 'styled-components';

const Container = styled.span<{ $size: number }>`
  position: relative;
  display: inline-block;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  &::after,
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    border-radius: 50%;
    border: 2px solid #fff;
    opacity: 0;
    animation: animateLoader 2s linear infinite;
  }
  &::after {
    animation-delay: 1s;
  }

  @keyframes animateLoader {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const Loader = ({ size }: { size: number }) => {
  return <Container $size={size} />;
};

export default Loader;
