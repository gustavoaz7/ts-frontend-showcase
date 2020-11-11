import React, { Component, Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { StaticContext } from 'react-router';
import { currencies, TCurrencies } from '../config/currencies';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import { PRIMARY_BLUE } from '../styles';
import { TCurrenciesRouteState } from '../config/routes';
import {
  changeBaseCurrencyAC,
  changeQuoteCurrencyAC,
} from '../redux/actions/currency';
import {
  baseCurrencySelector,
  quoteCurrencySelector,
} from '../redux/selectors/currency';
import { RootState } from '../redux/store';


const mapState = (state: RootState) => ({
  baseCurrency: baseCurrencySelector(state),
  quoteCurrency: quoteCurrencySelector(state),
})

const mapDispatch = {
  changeBaseCurrency: changeBaseCurrencyAC,
  changeQuoteCurrency: changeQuoteCurrencyAC,
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type CurrencyListProps = PropsFromRedux & RouteComponentProps<{}, StaticContext, TCurrenciesRouteState>;

class CurrencyListClass extends Component<CurrencyListProps, {}> {
  CURRENCIES_MAP = {
    action: {
      base: this.props.changeBaseCurrency,
      quote: this.props.changeQuoteCurrency,
    },
    selector: {
      base: this.props.baseCurrency,
      quote: this.props.quoteCurrency,
    }
  }

  handleCurrencyClick = (currency: TCurrencies) => {
    const { location, history } = this.props;

    this.CURRENCIES_MAP.action[location.state.type](currency);
    history.goBack();
  }

  render() {
    const { location } = this.props;
    const selectedCurrency = this.CURRENCIES_MAP.selector[location.state.type];
    return (
      <Container>
        {currencies.map((currency, i) => (
          <Fragment key={currency}>
            {i !== 0 && <Separator />}
            <ListItem
              text={currency}
              selected={currency === selectedCurrency}
              onClick={this.handleCurrencyClick}
              iconColor={PRIMARY_BLUE}
            />
          </Fragment>
        ))}
      </Container>
    )
  }
}

export const CurrencyList = connector(withRouter(CurrencyListClass));

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
