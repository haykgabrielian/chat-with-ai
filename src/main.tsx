import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

import { RouterProvider } from '@tanstack/react-router';

import AppThemeProvider from '@/components/AppThemeProvider';
import { ThemeType } from '@/helpers/themes';

import './main.css';

import router from '@/router';

const AppContainer = styled.div<{ theme: ThemeType }>`
  background-color: ${props => props.theme.background.primary};
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AppContainer>
        <RouterProvider router={router} />
      </AppContainer>
    </AppThemeProvider>
  </React.StrictMode>
);
