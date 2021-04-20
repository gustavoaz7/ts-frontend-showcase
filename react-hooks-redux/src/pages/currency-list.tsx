import React, { Fragment, useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { useHistory, useLocation } from 'react-router';
import { currencies, TCurrencies } from '../config/currencies';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import { CURRENCIES_ROUTE_TYPE, TCurrenciesRouteState } from '../config/routes';
import {
  useBaseCurrencySelector,
  useQuoteCurrencySelector,
} from '../redux/selectors/currency';
import { useAppDispatch } from '../redux/hooks';
import { changeBaseCurrencyThunk } from '../redux/thunks/currency';
import { changeQuoteCurrencyAC } from '../redux/actions/currency';

export function CurrencyList() {
  const dispatch = useAppDispatch();
  const handleChangeBaseCurrency = useCallback(
    (...args: Parameters<typeof changeBaseCurrencyThunk>) =>
      dispatch(changeBaseCurrencyThunk(...args)),
    [dispatch],
  );
  const handleChangeQuoteCurrency = useCallback(
    (...args: Parameters<typeof changeQuoteCurrencyAC>) =>
      dispatch(changeQuoteCurrencyAC(...args)),
    [dispatch],
  );
  const history = useHistory();
  const location = useLocation<TCurrenciesRouteState>();
  const theme = useTheme();

  const baseCurrency = useBaseCurrencySelector();
  const quoteCurrency = useQuoteCurrencySelector();
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
