import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Logo } from '../components/logo';
import { CurrencyInput } from '../components/currency-input';
import { Button } from '../components/button';
import { LastConverted } from '../components/last-converted';
import { Header } from '../components/header';
import { RootState } from '../redux/store';
import { changeCurrencyAmountAC } from '../redux/actions/currency';
import {
  amountSelector,
  baseCurrencySelector,
  quoteCurrencySelector,
  conversionsSelector,
  errorSelector,
  loadingSelector,
} from '../redux/selectors/currency';
import { CURRENCIES_ROUTE_TYPE, ROUTES } from '../config/routes';
import {
  getCurrencyConversionsThunk,
  swapCurrencyThunk,
} from '../redux/thunks/currency';
import { Loading } from '../components/loading';
import { Alert } from '../components/alert';
import logo from '../assets/logo.png';

const mapState = (state: RootState) => ({
  amount: amountSelector(state),
  baseCurrency: baseCurrencySelector(state),
  quoteCurrency: quoteCurrencySelector(state),
  rates: conversionsSelector(state),
  error: errorSelector(state),
  loading: loadingSelector(state),
});

const mapDispatch = {
  swapCurrency: swapCurrencyThunk,
  changeCurrencyAmount: changeCurrencyAmountAC,
  getCurrencyRates: getCurrencyConversionsThunk,
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
        <SwapButton onClick={swapCurrency}>
          <Image src={logo} />
          <span>Reverse Currencies</span>
        </SwapButton>
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
