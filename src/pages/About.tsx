import React from 'react';
import styled from 'styled-components';

import Logo from '@/components/Logo';
import { ThemeType } from '@/helpers/themes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const MainIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
`;

const Title = styled.h1<{ theme: ThemeType }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.text.white};
  margin-bottom: 12px;
`;

const Subtitle = styled.p<{ theme: ThemeType }>`
  font-size: 1.1rem;
  color: ${props => props.theme.text.secondary};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin: 20px 0;
  width: 100%;
`;

const FeatureCard = styled.div<{ theme: ThemeType }>`
  background: ${props => props.theme.background.messageAI};
  border-radius: 12px;
  padding: 16px;
  text-align: left;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureTitle = styled.h3<{ theme: ThemeType }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.text.primary};
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 14px;
    height: 14px;
    fill: ${props => props.theme.button.primaryHover};
  }
`;

const FeatureDescription = styled.p<{ theme: ThemeType }>`
  font-size: 0.85rem;
  color: ${props => props.theme.text.secondary};
  line-height: 1.4;
`;

const About = () => {
  return (
    <Container>
      <IconContainer>
        <MainIcon>
          <Logo size='xl' />
        </MainIcon>
      </IconContainer>

      <Title>Welcome to ZruyC</Title>
      <Subtitle>
        Your intelligent conversation partner powered by advanced AI. Start
        chatting to explore the possibilities!
      </Subtitle>

      <FeaturesGrid>
        <FeatureCard>
          <FeatureTitle>
            <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
            </svg>
            Smart Conversations
          </FeatureTitle>
          <FeatureDescription>
            Engage in natural, intelligent conversations with AI that
            understands context and provides thoughtful responses.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>
            <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' />
            </svg>
            Persistent Memory
          </FeatureTitle>
          <FeatureDescription>
            Your conversations are saved locally, so you can continue where you
            left off and revisit past discussions.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>
            <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
            </svg>
            Privacy First
          </FeatureTitle>
          <FeatureDescription>
            Your data stays on your device. No cloud storage, no tracking -
            complete privacy and control over your conversations.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>
            <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
            </svg>
            Beautiful Interface
          </FeatureTitle>
          <FeatureDescription>
            Enjoy a clean, modern interface designed for seamless conversations
            with smooth animations and intuitive controls.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
    </Container>
  );
};

export default About;
