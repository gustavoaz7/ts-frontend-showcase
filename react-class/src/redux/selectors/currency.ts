import { RootState } from '../store';

const selector = (state: RootState) => state.currency;

export const baseCurrencySelector = (state: RootState) =>
  selector(state).baseCurrency;

export const quoteCurrencySelector = (state: RootState) =>
  selector(state).quoteCurrency;

export const amountSelector = (state: RootState) => selector(state).amount;

export const loadingSelector = (state: RootState) => selector(state).loading;

export const errorSelector = (state: RootState) => selector(state).error;

export const conversionsSelector = (state: RootState) =>
  selector(state).conversions;
