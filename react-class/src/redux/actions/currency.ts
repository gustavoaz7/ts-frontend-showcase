import { createAction } from '../helpers';
import { SWAP_CURRENCY, CHANGE_CHURRENCY_AMOUNT } from '../contants';

export const swapCurrencyAC = () => createAction(SWAP_CURRENCY);

export const changeCurrencyAmountAC = (payload: number) =>
  createAction(CHANGE_CHURRENCY_AMOUNT, payload);
