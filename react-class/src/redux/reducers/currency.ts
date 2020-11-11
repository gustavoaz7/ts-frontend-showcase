import { Reducer } from 'redux';
import {
  SWAP_CURRENCY,
  CHANGE_CHURRENCY_AMOUNT,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
} from '../constants';
import * as currencyActions from '../actions/currency';
import { ExtractActions } from '../types';
import { TCurrencies } from '../../config/currencies';

export type CurrencyState = {
  baseCurrency: TCurrencies;
  quoteCurrency: TCurrencies;
  amount: number;
  error: object | null;
  conversions: {
    [key in TCurrencies]?: {
      isFetching: boolean;
      base: string;
      date: string;
      rates: {
        [k in TCurrencies]: number;
      };
    }
  };
}

const initialState: CurrencyState = {
  baseCurrency: 'BRL',
  quoteCurrency: 'USD',
  amount: 1,
  error: null,
  conversions: {
    BRL: {
      isFetching: false,
      base: 'BRL',
      date: '2020-11-10',
      rates: {
        CAD: 0.2421691865,
        HKD: 1.4405865047,
        ISK: 25.5337224486,
        PHP: 8.9753472932,
        DKK: 1.1712002265,
        HUF: 56.2213866558,
        CZK: 4.15823671,
        GBP: 0.1403064676,
        RON: 0.7656498277,
        SEK: 1.6047071409,
        IDR: 2610.0467252962,
        INR: 13.7920645659,
        BRL: 1,
        RUB: 14.1953180309,
        HRK: 1.1897644856,
        JPY: 19.5648411812,
        THB: 5.636140522,
        CHF: 0.1701776191,
        EUR: 0.1573242295,
        MYR: 0.7654610387,
        BGN: 0.3076947281,
        TRY: 1.5366644117,
        CNY: 1.2288123594,
        NOK: 1.6773594701,
        NZD: 0.2722338467,
        ZAR: 2.8870097384,
        USD: 0.1857684502,
        MXN: 3.7915768608,
        SGD: 0.2505545679,
        AUD: 0.2554473514,
        ILS: 0.627471957,
        KRW: 207.4996460205,
        PLN: 0.7078017085
      },
    }
  },
};

type CurrencyActions = ExtractActions<
  typeof currencyActions[keyof typeof currencyActions]
>;

export const currencyReducer: Reducer<CurrencyState, CurrencyActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CHANGE_CHURRENCY_AMOUNT:
      return { ...state, amount: action.payload || 0 };
    case SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
      };
    case CHANGE_BASE_CURRENCY:
      return { ...state, baseCurrency: action.payload };
    case CHANGE_QUOTE_CURRENCY:
      return { ...state, quoteCurrency: action.payload };
    default:
      return state;
  }
};
