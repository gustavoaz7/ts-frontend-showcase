import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components'
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Logo } from '../components/logo';
import { CurrencyInput } from '../components/currency-input';
import { ClearButton } from '../components/clear-button';
import { LastConverted } from '../components/last-converted';
import { Header } from '../components/header';
import { RootState } from '../redux/store';
import { swapCurrencyAC, changeCurrencyAmountAC } from '../redux/actions/currency';
import {
  amountSelector,
  baseCurrencySelector,
  quoteCurrencySelector,
  conversionsSelector,
} from '../redux/selectors/currency';
import { ROUTES } from '../config/routes';


const mapState = (state: RootState) => ({
  amount: amountSelector(state),
  baseCurrency: baseCurrencySelector(state),
  quoteCurrency: quoteCurrencySelector(state),
  conversions: conversionsSelector(state),
});

const mapDispatch = {
  swapCurrency: swapCurrencyAC,
  changeCurrencyAmount: changeCurrencyAmountAC,
};

const connector = connect(
  mapState,
  mapDispatch
);

type PropsFromRedux = ConnectedProps<typeof connector>

type HomeProps = PropsFromRedux & RouteComponentProps;

class HomeClass extends Component<HomeProps, {}> {
  goToCurrencyList = () => (
    this.props.history.push(ROUTES.CURRENCIES)
  );

  handleChangeQuoteCurrency = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({quoteCurrency: event.target.value})
  );

  handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.props.changeCurrencyAmount(+event.target.value)
  );

  render() {
    const {
      baseCurrency,
      quoteCurrency,
      amount,
      conversions,
      swapCurrency,
    } = this.props;
    const conversionSelector = conversions[baseCurrency];
    const conversionDate = new Date(conversionSelector?.date ?? Date.now());
    console.log('!!TCL: HomeClass -> render -> conversionDate', conversionDate);
    const conversionRate: number = (conversionSelector?.rates?.[quoteCurrency] ?? 0);
    const quotePrice = (amount * conversionRate).toFixed(2);

    return (
      <Wrapper>
        <Header />
        <Logo />
        <CurrencyInput
          currency={baseCurrency}
          value={amount.toString()}
          onClick={this.goToCurrencyList}
          onChange={this.handleCurrencyChange}
        />
        <CurrencyInput
          currency={quoteCurrency}
          disabled
          value={quotePrice}
          onClick={this.goToCurrencyList}
        />
        <LastConverted
          base={baseCurrency}
          quote={quoteCurrency}
          rate={conversionRate}
          date={conversionDate}
        />
        <StyledClearButton text={'Reverse Currencies'} onClick={swapCurrency} />
      </Wrapper>
    )
  }
}

export const Home = connector(withRouter(HomeClass));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  background-color: #4F6D7A;
`;

const StyledClearButton = styled(ClearButton)`
  margin-top: 10px;
`;
