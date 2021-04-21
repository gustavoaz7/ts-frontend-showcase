import React, { useCallback, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Logo } from '../components/logo';
import { CurrencyInput } from '../components/currency-input';
import { Button } from '../components/button';
import { LastConverted } from '../components/last-converted';
import { Header } from '../components/header';
import { currencySelectors, currencyActions } from '../redux/currency';
import { CURRENCIES_ROUTE_TYPE, ROUTES } from '../config/routes';
import { Loading } from '../components/loading';
import { Alert } from '../components/alert';
import { useAppDispatch } from '../redux/hooks';
import logo from '../assets/logo.png';

export function Home() {
  const dispatch = useAppDispatch();
  const baseCurrency = currencySelectors.useBaseCurrencySelector();
  useEffect(() => {
    dispatch(currencyActions.getConversions(baseCurrency));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory();

  const swapCurrency = useCallback(() => dispatch(currencyActions.swap()), [
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

  const amount = currencySelectors.useAmountSelector();
  const quoteCurrency = currencySelectors.useQuoteCurrencySelector();
  const rates = currencySelectors.useConversionsSelector();
  const error = currencySelectors.useErrorSelector();
  const loading = currencySelectors.useLoadingSelector();

  const handleCurrencyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(currencyActions.changeAmount(+event.target.value)),
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
      <SwapButton onClick={swapCurrency}>
        <Image src={logo} />
        <span>Reverse Currencies</span>
      </SwapButton>
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

const SwapButton = styled(Button)`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin: 10px;
`;
