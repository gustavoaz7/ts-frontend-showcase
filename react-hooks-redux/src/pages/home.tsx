import React, { useCallback, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Logo } from '../components/logo';
import { CurrencyInput } from '../components/currency-input';
import { ClearButton } from '../components/clear-button';
import { LastConverted } from '../components/last-converted';
import { Header } from '../components/header';
import { changeCurrencyAmountAC } from '../redux/actions/currency';
import {
  useAmountSelector,
  useBaseCurrencySelector,
  useQuoteCurrencySelector,
  useConversionsSelector,
  useErrorSelector,
  useLoadingSelector,
} from '../redux/selectors/currency';
import { CURRENCIES_ROUTE_TYPE, ROUTES } from '../config/routes';
import {
  getCurrencyConversionsThunk,
  swapCurrencyThunk,
} from '../redux/thunks/currency';
import { Loading } from '../components/loading';
import { Alert } from '../components/alert';
import { useAppDispatch } from '../redux/hooks';

export function Home() {
  const dispatch = useAppDispatch();
  const baseCurrency = useBaseCurrencySelector();
  useEffect(() => {
    dispatch(getCurrencyConversionsThunk(baseCurrency));
  });

  const history = useHistory();

  const swapCurrency = useCallback(() => dispatch(swapCurrencyThunk()), [
    dispatch,
  ]);
  const goToCurrencyListBase = useCallback(
    () =>
      history.push(ROUTES.CURRENCIES, {
        type: CURRENCIES_ROUTE_TYPE.BASE,
      }),
    [history],
  );

  const goToCurrencyListQuote = useCallback(
    () =>
      history.push(ROUTES.CURRENCIES, {
        type: CURRENCIES_ROUTE_TYPE.QUOTE,
      }),
    [history],
  );

  const amount = useAmountSelector();
  const quoteCurrency = useQuoteCurrencySelector();
  const rates = useConversionsSelector();
  const error = useErrorSelector();
  const loading = useLoadingSelector();

  const handleCurrencyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(changeCurrencyAmountAC(+event.target.value)),
    [dispatch],
  );

  const conversionSelector = rates[baseCurrency];
  const conversionDate = new Date(conversionSelector?.date ?? Date.now());
  const conversionRate: number =
    conversionSelector?.rates?.[quoteCurrency] ?? 0;
  const quotePrice = (amount * conversionRate).toFixed(2);

  return (
    <Wrapper>
      {loading && <Loading overlay />}
      {error && <Alert message="Failed retrieving currency rates." />}
      <Header />
      <Logo />
      <CurrencyInput
        currency={baseCurrency}
        value={amount.toString()}
        onClick={goToCurrencyListBase}
        onChange={handleCurrencyChange}
      />
      <CurrencyInput
        currency={quoteCurrency}
        disabled
        value={quotePrice}
        onClick={goToCurrencyListQuote}
      />
      <LastConverted
        base={baseCurrency}
        quote={quoteCurrency}
        rate={conversionRate}
        date={conversionDate}
      />
      <StyledClearButton text="Reverse Currencies" onClick={swapCurrency} />
    </Wrapper>
  );
}

const Wrapper = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.colors.primary};
`);

const StyledClearButton = styled(ClearButton)`
  margin-top: 10px;
`;
