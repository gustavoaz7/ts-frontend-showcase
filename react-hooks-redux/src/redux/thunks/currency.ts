import { ThunkAction } from 'redux-thunk';
import { TCurrencies } from '../../config/currencies';
import { getCurrencyConversions } from '../../services/currency';
import {
  getCurrencyConversionsRequestAC,
  getCurrencyConversionsFulfilledAC,
  getCurrencyConversionsRejectedAC,
  swapCurrencyAC,
  changeBaseCurrencyAC,
} from '../actions/currency';
import type { RootState } from '../store';
import type { CurrencyActions } from '../reducers/currency';

type ThunkResult = ThunkAction<void, RootState, undefined, CurrencyActions>;
type AsyncThunkResult = ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  CurrencyActions
>;

export const getCurrencyConversionsThunk = (
  payload: TCurrencies,
): AsyncThunkResult => async (dispatch, getState) => {
  const state = getState();
  const hasCurrentConversion = state.currency.conversions[payload];
  if (hasCurrentConversion) return;

  dispatch(getCurrencyConversionsRequestAC());
  try {
    const res = await getCurrencyConversions(payload);
    const conversions = await res.json();
    dispatch(getCurrencyConversionsFulfilledAC(conversions));
  } catch (error) {
    dispatch(getCurrencyConversionsRejectedAC(error));
  }
};

export const swapCurrencyThunk = (): ThunkResult => (dispatch, getState) => {
  dispatch(swapCurrencyAC());
  const state = getState();
  const newBase = state.currency.baseCurrency;
  dispatch(getCurrencyConversionsThunk(newBase));
};

export const changeBaseCurrencyThunk = (payload: TCurrencies): ThunkResult => (
  dispatch,
) => {
  dispatch(changeBaseCurrencyAC(payload));
  dispatch(getCurrencyConversionsThunk(payload));
};
