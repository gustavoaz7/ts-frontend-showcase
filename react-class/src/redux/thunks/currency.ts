import { ThunkAction } from 'redux-thunk'
import { TCurrencies } from "../../config/currencies";
import { getCurrencyConversions } from "../../services/currency";
import * as actions from "../actions/currency";
import { baseCurrencySelector, conversionsSelector } from '../selectors/currency';
import { RootState } from '../store';
import { ExtractActions } from '../types';


type CurrencyActions = ExtractActions<typeof actions[keyof typeof actions]>;
type ThunkResult = ThunkAction<void, RootState, undefined, CurrencyActions>;

export const getCurrencyConversionsThunk = (payload: TCurrencies): ThunkResult => (
  async (dispatch, getState) => {
    const state = getState();
    const hasCurrentConversion = conversionsSelector(state)[payload];
    if (hasCurrentConversion) return;

    dispatch(actions.getCurrencyConversionsRequestAC());
    try {
      const res = await getCurrencyConversions(payload);
      const conversions = await res.json();
      dispatch(actions.getCurrencyConversionsFulfilledAC(conversions));
    } catch (error) {
      dispatch(actions.getCurrencyConversionsRejectedAC(error));
    }
  }
);

export const swapCurrencyThunk = (): ThunkResult => (dispatch, getState) => {
  dispatch(actions.swapCurrencyAC());
  const state = getState();
  const newBase = baseCurrencySelector(state);
  dispatch(getCurrencyConversionsThunk(newBase));
};

export const changeBaseCurrencyThunk = (
  payload: TCurrencies,
): ThunkResult => (dispatch) => {
  dispatch(actions.changeBaseCurrencyAC(payload));
  dispatch(getCurrencyConversionsThunk(payload));
};
