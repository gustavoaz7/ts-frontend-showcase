import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CurrencyList } from './pages/currency-list';
import { Home } from './pages/home';
import { Themes } from './pages/themes';
import { Options } from './pages/options';
import { ROUTES } from './config/routes';

export const Router: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path={ROUTES.CURRENCIES}>
        <CurrencyList />
      </Route>
      <Route path={ROUTES.THEMES}>
        <Themes />
      </Route>
      <Route path={ROUTES.OPTIONS}>
        <Options />
      </Route>
      <Route path={ROUTES.HOME}>
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);
