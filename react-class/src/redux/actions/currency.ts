import { createAction } from '../helpers';
import {
  SWAP_CURRENCY,
  CHANGE_CHURRENCY_AMOUNT,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
} from '../constants';
import { TCurrencies } from '../../config/currencies';

export const swapCurrencyAC = () => createAction(SWAP_CURRENCY);

export const changeCurrencyAmountAC = (payload: number) =>
  createAction(CHANGE_CHURRENCY_AMOUNT, payload);

export const changeBaseCurrencyAC = (payload: TCurrencies) =>
  createAction(CHANGE_BASE_CURRENCY, payload);

export const changeQuoteCurrencyAC = (payload: TCurrencies) =>
  createAction(CHANGE_QUOTE_CURRENCY, payload);
