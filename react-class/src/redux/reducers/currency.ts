import { Reducer } from 'redux';
import { CURRENCY_ACTION_TYPES } from '../action-types/currency';
import * as currencyActions from '../actions/currency';
import { ExtractActions } from '../types';
import { TCurrencies } from '../../config/currencies';
import { exhaustiveCheck } from '../../utils';

export type CurrencyState = Readonly<{
  baseCurrency: TCurrencies;
  quoteCurrency: TCurrencies;
  amount: number;
  loading: boolean;
  error: Error | null;
  conversions: {
    [key in TCurrencies]?: {
      base: string;
      date: string;
      rates: {
        [k in TCurrencies]: number;
      };
    };
  };
}>;

const initialState: CurrencyState = {
  baseCurrency: 'BRL',
  quoteCurrency: 'USD',
  amount: 1,
  loading: false,
  error: null,
  conversions: {},
};

type CurrencyActions = ExtractActions<
  typeof currencyActions[keyof typeof currencyActions]
>;

export const currencyReducer: Reducer<CurrencyState, CurrencyActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CURRENCY_ACTION_TYPES.CHANGE_AMOUNT:
      return { ...state, amount: action.payload || 0 };
    case CURRENCY_ACTION_TYPES.SWAP:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
      };
    case CURRENCY_ACTION_TYPES.CHANGE_BASE:
      return { ...state, baseCurrency: action.payload };
    case CURRENCY_ACTION_TYPES.CHANGE_QUOTE:
      return { ...state, quoteCurrency: action.payload };
    case CURRENCY_ACTION_TYPES.GET_CONVERSIONS_REQUEST:
      return { ...state, loading: true };
    case CURRENCY_ACTION_TYPES.GET_CONVERSIONS_FULFILLED:
      return {
        ...state,
        loading: false,
        error: null,
        baseCurrency: action.payload.base,
        conversions: {
          ...state.conversions,
          [action.payload.base]: { ...action.payload },
        },
      };
    case CURRENCY_ACTION_TYPES.GET_CONVERSIONS_REJECTED:
      return { ...state, loading: false, error: action.payload };
    default:
      exhaustiveCheck(action);
      return state;
  }
};
