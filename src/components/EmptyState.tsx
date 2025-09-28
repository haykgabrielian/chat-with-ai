import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ThemeType } from '@/helpers/themes';
import questionsData from '@/helpers/questions';

interface EmptyStateProps {
  onQuestionSelect: (question: string) => void;
}

const Container = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.background.primary};
`;

const Content = styled.div<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 950px;
`;

const Header = styled.div<{ theme: ThemeType }>`
  margin-bottom: 40px;
  text-align: left;
`;

const Title = styled.h1<{ theme: ThemeType }>`
  margin-bottom: 12px;
  font-size: 2.5rem;
  font-weight: 600;
  color: ${props => props.theme.text.primary};
`;

const Subtitle = styled.p<{ theme: ThemeType }>`
  max-width: 600px;
  margin: 0;
  font-size: 1.1rem;
  color: ${props => props.theme.text.secondary};
`;

const TabsContainer = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 10px;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Tab = styled.button<{ theme: ThemeType; $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 10px;
  background-color: ${props =>
    props.$isActive ? props.theme.status.success : props.theme.button.primary};
  color: ${props => props.theme.text.white};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  white-space: nowrap;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover:not(:disabled) {
    background-color: ${props =>
      props.$isActive
        ? props.theme.status.success
        : props.theme.button.primaryHover};
  }
`;

const Questions = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 800px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Question = styled.button<{ theme: ThemeType }>`
  width: fit-content;
  padding: 6px 12px;
  margin-bottom: 5px;
  cursor: pointer;
  color: ${props => props.theme.text.primary};
  border-radius: 10px;
  text-align: left;
  background-color: transparent;
  &:hover {
    background-color: ${props => props.theme.background.chatItemHover};
  }
`;

const EmptyState = ({ onQuestionSelect }: EmptyStateProps) => {
  const [activeTab, setActiveTab] = useState<string>('general');

  const handleQuestionClick = (question: string) => {
    onQuestionSelect(question);
  };

  const currentQuestions =
    questionsData.categories.find(cat => cat.id === activeTab)?.questions || [];

  return (
    <Container>
      <Content>
        <Header>
          <Title>How can I help you today?</Title>
          <Subtitle>
            Choose from these popular topics or ask me anything you'd like to
            know
          </Subtitle>
        </Header>
        <TabsContainer>
          {questionsData.categories.map(category => {
            const IconComponent = category.icon;
            return (
              <Tab
                key={category.id}
                $isActive={activeTab === category.id}
                onClick={() => setActiveTab(category.id)}
              >
                <IconComponent />
                {category.label}
              </Tab>
            );
          })}
        </TabsContainer>
        <Questions>
          {currentQuestions.map((question, index) => (
            <Question key={index} onClick={() => handleQuestionClick(question)}>
              {question}
            </Question>
          ))}
        </Questions>
      </Content>
    </Container>
  );
};

export default EmptyState;
