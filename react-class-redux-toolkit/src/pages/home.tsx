import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Logo } from '../components/logo';
import { CurrencyInput } from '../components/currency-input';
import { ClearButton } from '../components/clear-button';
import { LastConverted } from '../components/last-converted';
import { Header } from '../components/header';
import { RootState } from '../redux/store';
import { CURRENCIES_ROUTE_TYPE, ROUTES } from '../config/routes';
import { currencySelectors, currencyActions } from '../redux/currency';
import { Loading } from '../components/loading';
import { Alert } from '../components/alert';

const mapState = (state: RootState) => ({
  amount: currencySelectors.amountSelector(state),
  baseCurrency: currencySelectors.baseCurrencySelector(state),
  quoteCurrency: currencySelectors.quoteCurrencySelector(state),
  rates: currencySelectors.conversionsSelector(state),
  error: currencySelectors.errorSelector(state),
  loading: currencySelectors.loadingSelector(state),
});

const mapDispatch = {
  swapCurrency: currencyActions.swap,
  changeCurrencyAmount: currencyActions.changeAmount,
  getCurrencyRates: currencyActions.getConversions,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type HomeProps = PropsFromRedux & RouteComponentProps;

class HomeClass extends Component<HomeProps, unknown> {
  componentDidMount() {
    const { getCurrencyRates, baseCurrency } = this.props;
    getCurrencyRates(baseCurrency);
  }

  goToCurrencyListBase = () =>
    this.props.history.push(ROUTES.CURRENCIES, {
      type: CURRENCIES_ROUTE_TYPE.BASE,
    });

  goToCurrencyListQuote = () =>
    this.props.history.push(ROUTES.CURRENCIES, {
      type: CURRENCIES_ROUTE_TYPE.QUOTE,
    });

  handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.changeCurrencyAmount(+event.target.value);

  render() {
    const {
      baseCurrency,
      quoteCurrency,
      amount,
      rates,
      swapCurrency,
      loading,
      error,
    } = this.props;
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
          onClick={this.goToCurrencyListBase}
          onChange={this.handleCurrencyChange}
        />
        <CurrencyInput
          currency={quoteCurrency}
          disabled
          value={quotePrice}
          onClick={this.goToCurrencyListQuote}
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
}

export const Home = connector(withRouter(HomeClass));

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
