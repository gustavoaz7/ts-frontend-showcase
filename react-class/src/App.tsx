import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider } from 'styled-components'
import { themeVariantSelector } from './redux/selectors/theme-variant';
import { RootState } from './redux/store';
import { Router } from './router';
import { getTheme } from './config/themes';


const mapState = (state: RootState) => ({
  themeVariant: themeVariantSelector(state),
})

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppProps = PropsFromRedux;

const App: FC<AppProps> = ({ themeVariant }) => {
  return (
    <ThemeProvider theme={getTheme(themeVariant)}>
      <Router />
    </ThemeProvider>
  );
}

export default connector(App);
