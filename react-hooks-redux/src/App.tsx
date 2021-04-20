import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { useThemeVariantSelector } from './redux/selectors/theme-variant';
import { persistor } from './redux/store';
import { Router } from './router';
import { getTheme } from './config/themes';
import { ErrorBoundary } from './components/error-boundary';
import { Loading } from './components/loading';

export function App() {
  const themeVariant = useThemeVariantSelector();

  return (
    <PersistGate loading={<Loading overlay />} persistor={persistor}>
      <ThemeProvider theme={getTheme(themeVariant)}>
        <ErrorBoundary>
          <GlobalStyle />
          <Router />
        </ErrorBoundary>
      </ThemeProvider>
    </PersistGate>
  );
}

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
