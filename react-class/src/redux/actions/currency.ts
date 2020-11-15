import { createAction } from '../helpers';
import { CURRENCY_ACTION_TYPES } from '../action-types/currency';
import { TCurrencies, TCurrencyApi } from '../../config/currencies';


export const swapCurrencyAC = () => createAction(CURRENCY_ACTION_TYPES.SWAP);

export const changeCurrencyAmountAC = (payload: number) =>
  createAction(CURRENCY_ACTION_TYPES.CHANGE_AMOUNT, payload);

export const changeBaseCurrencyAC = (payload: TCurrencies) =>
  createAction(CURRENCY_ACTION_TYPES.CHANGE_BASE, payload);

export const changeQuoteCurrencyAC = (payload: TCurrencies) =>
  createAction(CURRENCY_ACTION_TYPES.CHANGE_QUOTE, payload);

export const getCurrencyConversionsRequestAC = () =>
  createAction(CURRENCY_ACTION_TYPES.GET_CONVERSIONS_REQUEST);

export const getCurrencyConversionsFulfilledAC = (payload: TCurrencyApi) =>
  createAction(CURRENCY_ACTION_TYPES.GET_CONVERSIONS_FULFILLED, payload);

export const getCurrencyConversionsRejectedAC = (payload: Error) =>
  createAction(CURRENCY_ACTION_TYPES.GET_CONVERSIONS_REJECTED, payload);
