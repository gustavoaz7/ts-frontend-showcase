import React, { Fragment, useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { useHistory, useLocation } from 'react-router';
import { currencies, TCurrencies } from '../config/currencies';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import { CURRENCIES_ROUTE_TYPE, TCurrenciesRouteState } from '../config/routes';
import { currencySelectors, currencyActions } from '../redux/currency';
import { useAppDispatch } from '../redux/hooks';

export function CurrencyList() {
  const dispatch = useAppDispatch();
  const handleChangeBaseCurrency = useCallback(
    (...args: Parameters<typeof currencyActions.changeBase>) =>
      dispatch(currencyActions.changeBase(...args)),
    [dispatch],
  );
  const handleChangeQuoteCurrency = useCallback(
    (...args: Parameters<typeof currencyActions.changeQuote>) =>
      dispatch(currencyActions.changeQuote(...args)),
    [dispatch],
  );
  const history = useHistory();
  const location = useLocation<TCurrenciesRouteState>();
  const theme = useTheme();

  const baseCurrency = currencySelectors.useBaseCurrencySelector();
  const quoteCurrency = currencySelectors.useQuoteCurrencySelector();
  const currencyMap: Record<CURRENCIES_ROUTE_TYPE, TCurrencies> = useMemo(
    () => ({
      [CURRENCIES_ROUTE_TYPE.BASE]: baseCurrency,
      [CURRENCIES_ROUTE_TYPE.QUOTE]: quoteCurrency,
    }),
    [baseCurrency, quoteCurrency],
  );

  const handleCurrencyClick = useCallback(
    (currency: TCurrencies) => {
      const actionMap: Record<
        CURRENCIES_ROUTE_TYPE,
        (c: TCurrencies) => unknown
      > = {
        [CURRENCIES_ROUTE_TYPE.BASE]: handleChangeBaseCurrency,
        [CURRENCIES_ROUTE_TYPE.QUOTE]: handleChangeQuoteCurrency,
      };
      actionMap[location.state.type](currency);
      history.goBack();
    },
    [history, location, handleChangeBaseCurrency, handleChangeQuoteCurrency],
  );

  const selectedCurrency = currencyMap[location.state.type];

  return (
    <Container>
      {currencies.map((currency, i) => (
        <Fragment key={currency}>
          {i !== 0 && <Separator />}
          <ListItem
            text={currency}
            selected={currency === selectedCurrency}
            onClick={handleCurrencyClick}
            iconColor={theme.colors.primary}
          />
        </Fragment>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
