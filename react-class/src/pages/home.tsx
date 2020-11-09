import React, { Component } from 'react';
import styled from 'styled-components'
import { Logo } from '../components/logo';
import { CurrencyInput } from '../components/currency-input';
import { ClearButton } from '../components/clear-button';
import { LastConverted } from '../components/last-converted';
import { Header } from '../components/header';


const BASE_CURRENCY = 'BRL';
const BASE_PRICE = '1';
const CONV_CURRENCY = 'USD';
const CONV_PRICE = '0.25';
const CONV_RATE = 0.25;
const CONV_DATE = new Date();

export class Home extends Component {
  state = {
    baseCurrency: BASE_PRICE,
    quoteCurrency: CONV_PRICE,
  }

  handleChangeBaseCurrency = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({baseCurrency: event.target.value})
  );

  handleChangeQuoteCurrency = (event: React.ChangeEvent<HTMLInputElement>) => (
    this.setState({quoteCurrency: event.target.value})
  );

  render() {
    const { baseCurrency, quoteCurrency } = this.state;
    return (
      <Wrapper>
        <Header />
        <Logo />
        <CurrencyInput
          currency={BASE_CURRENCY}
          value={baseCurrency}
          onClick={() => {}}
          onChange={this.handleChangeBaseCurrency}
        />
        <CurrencyInput
          currency={CONV_CURRENCY}
          disabled
          value={quoteCurrency}
          onClick={() => {}}
          onChange={this.handleChangeQuoteCurrency}
        />
        <LastConverted
          base={BASE_CURRENCY}
          quote={CONV_CURRENCY}
          rate={CONV_RATE}
          date={CONV_DATE}
        />
        <StyledClearButton text={'Reverse Currencies'} onClick={() => {}} />
      </Wrapper>
    )
  }
}

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
