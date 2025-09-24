import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

import { RouterProvider } from '@tanstack/react-router';

import AppThemeProvider from '@/components/Theme/AppThemeProvider';
import AuthProvider from '@/auth/AuthContext';

import { ThemeType } from '@/helpers/themes';

import './main.css';

import router from '@/router';

const AppContainer = styled.div<{ theme: ThemeType }>`
  background-color: ${props => props.theme.background.primary};
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AuthProvider>
        <AppContainer>
          <RouterProvider router={router} />
        </AppContainer>
      </AuthProvider>
    </AppThemeProvider>
  </React.StrictMode>
);
