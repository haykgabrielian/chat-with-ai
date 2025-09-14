import React from 'react';
import styled from 'styled-components';

import { CloseIcon, WarningIcon } from '@/components/icons';
import Button from '@/components/Button';
import { ThemeType } from '@/helpers/themes';

type ConfirmationPopupProps = {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subtitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonVariant?: 'primary' | 'danger';
  iconLevel?: 'info' | 'warning' | 'critical';
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(40 40 40 / 80%);
  z-index: 1000;
`;

const PopupContainer = styled.div<{ theme: ThemeType }>`
  position: relative;
  max-width: 460px;
  width: 100%;
  padding: 24px;
  background-color: ${props => props.theme.background.modal};
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button<{ theme: ThemeType }>`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: none;
  border: none;
  color: ${props => props.theme.text.secondary};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.text.primary};
    background-color: ${props => props.theme.background.chatItemHover};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const WarningIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Title = styled.h2<{ theme: ThemeType }>`
  margin: 0;
  color: ${props => props.theme.text.primary};
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: left;
`;

const Subtitle = styled.p<{ theme: ThemeType }>`
  margin: 0 0 24px 0;
  color: ${props => props.theme.text.secondary};
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  onClose,
  onConfirm,
  title,
  subtitle,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  iconLevel = 'warning',
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <PopupContainer>
        <CloseButton onClick={onClose}>
          <CloseIcon size={16} />
        </CloseButton>
        <TitleContainer>
          <WarningIconContainer>
            <WarningIcon level={iconLevel} size={24} />
          </WarningIconContainer>
          <Title>{title}</Title>
        </TitleContainer>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <ButtonContainer>
          <Button variant='secondary' onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button variant='primary' onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </ButtonContainer>
      </PopupContainer>
    </Overlay>
  );
};

export default ConfirmationPopup;
