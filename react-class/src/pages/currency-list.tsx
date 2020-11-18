import React, { Component, Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled, { withTheme, ThemeProps, DefaultTheme } from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { currencies, TCurrencies } from '../config/currencies';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import { CURRENCIES_ROUTE_TYPE, TCurrenciesRouteState } from '../config/routes';
import { changeQuoteCurrencyAC } from '../redux/actions/currency';
import {
  baseCurrencySelector,
  quoteCurrencySelector,
} from '../redux/selectors/currency';
import { RootState } from '../redux/store';
import { changeBaseCurrencyThunk } from '../redux/thunks/currency';

const mapState = (state: RootState) => ({
  baseCurrency: baseCurrencySelector(state),
  quoteCurrency: quoteCurrencySelector(state),
});

const mapDispatch = {
  changeBaseCurrency: changeBaseCurrencyThunk,
  changeQuoteCurrency: changeQuoteCurrencyAC,
};

const connector = connect(mapState, mapDispatch);

type CurrencyListProps = ConnectedProps<typeof connector> &
  RouteComponentProps<
    Record<string, string>,
    StaticContext,
    TCurrenciesRouteState
  > &
  ThemeProps<DefaultTheme>;

class CurrencyListClass extends Component<CurrencyListProps, unknown> {
  CURRENCIES_MAP = {
    action: {
      [CURRENCIES_ROUTE_TYPE.BASE]: this.props.changeBaseCurrency,
      [CURRENCIES_ROUTE_TYPE.QUOTE]: this.props.changeQuoteCurrency,
    },
    selector: {
      [CURRENCIES_ROUTE_TYPE.BASE]: this.props.baseCurrency,
      [CURRENCIES_ROUTE_TYPE.QUOTE]: this.props.quoteCurrency,
    },
  };

  handleCurrencyClick = (currency: TCurrencies) => {
    const { location, history } = this.props;

    this.CURRENCIES_MAP.action[location.state.type](currency);
    history.goBack();
  };

  render() {
    const { location, theme } = this.props;
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
              iconColor={theme.colors.primary}
            />
          </Fragment>
        ))}
      </Container>
    );
  }
}

export const CurrencyList = connector(withRouter(withTheme(CurrencyListClass)));

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
