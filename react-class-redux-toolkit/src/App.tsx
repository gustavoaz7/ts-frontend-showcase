import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { themeVariantSelector } from './redux/theme-variant';
import { persistor, RootState } from './redux/store';
import { Router } from './router';
import { getTheme } from './config/themes';
import { ErrorBoundary } from './components/error-boundary';
import { Loading } from './components/loading';

const mapState = (state: RootState) => ({
  themeVariant: themeVariantSelector(state),
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppProps = PropsFromRedux;

const App: FC<AppProps> = ({ themeVariant }) => (
  <PersistGate loading={<Loading overlay />} persistor={persistor}>
    <ThemeProvider theme={getTheme(themeVariant)}>
      <ErrorBoundary>
        <GlobalStyle />
        <Router />
      </ErrorBoundary>
    </ThemeProvider>
  </PersistGate>
);

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default connector(App);
