import React, { useEffect, useState } from 'react';
import { ThemeType } from '@/helpers/themes';
import styled from 'styled-components';

const StatusText = styled.span<{ theme: ThemeType }>`
  margin-left: 5px;
  transition: opacity 0.3s ease-in-out;
  font-size: 14px;
  font-style: italic;
  color: ${props => props.theme.text.secondary};
`;

const TypingStatus: React.FC = () => {
  const texts = ['Thinking', 'Analyzing', 'Processing', 'Generating'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % texts.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [texts.length]);

  return <StatusText>{texts[index]}</StatusText>;
};

export default TypingStatus;
