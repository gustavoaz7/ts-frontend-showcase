import React, { Component } from 'react';
import styled from 'styled-components'
import { Logo } from '../components/logo';
import { CurrencyInput } from '../components/currency-input';

export class Home extends Component {
  state = {
    baseCurrency: '6',
    quoteCurrency: '1',
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
        <Logo />
        <CurrencyInput
          currency="BRL"
          value={baseCurrency}
          onClick={() => {}}
          onChange={this.handleChangeBaseCurrency}
        />
        <CurrencyInput
          currency="USD"
          disabled
          value={quoteCurrency}
          onClick={() => {}}
          onChange={this.handleChangeQuoteCurrency}
        />
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
  background-color: #4F6D7A;
`;
