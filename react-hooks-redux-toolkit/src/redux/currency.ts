import {
  createAsyncThunk,
  createSlice,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import { TCurrencies, TCurrencyApi } from '../config/currencies';
import type { RootState } from './store';
import { getCurrencyConversions } from '../services/currency';
import { useAppSelector } from './hooks';

const SLICE_NAME = '@@CURRENCY';

export type CurrencyState = Readonly<{
  baseCurrency: TCurrencies;
  quoteCurrency: TCurrencies;
  amount: number;
  loading: boolean;
  error: string | null;
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

const getConversions = createAsyncThunk<
  TCurrencyApi,
  TCurrencies,
  { state: RootState; rejectValue: string }
>(SLICE_NAME, async (payload, { getState, rejectWithValue }) => {
  const state = getState();
  const hasCurrentConversion = state.currency.conversions[payload];
  if (hasCurrentConversion) return hasCurrentConversion;

  try {
    const res = await getCurrencyConversions(payload);
    const conversions = await res.json();
    return conversions;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const swap = (): ThunkAction<void, RootState, undefined, Action> => (
  dispatch,
  getState,
) => {
  dispatch(currencySlice.actions.swap_internal());
  const state = getState();
  const newBase = state.currency.baseCurrency;
  dispatch(getConversions(newBase));
};

const changeBase = (
  payload: TCurrencies,
): ThunkAction<void, RootState, undefined, Action> => (dispatch) => {
  dispatch(currencySlice.actions.changeBase_internal(payload));
  dispatch(getConversions(payload));
};

/* eslint-disable no-param-reassign */
export const currencySlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    swap_internal: (state) => {
      [state.baseCurrency, state.quoteCurrency] = [
        state.quoteCurrency,
        state.baseCurrency,
      ];
    },
    changeAmount: (state, action) => {
      state.amount = action.payload || 0;
    },
    changeBase_internal: (state, action) => {
      state.baseCurrency = action.payload;
    },
    changeQuote: (state, action) => {
      state.quoteCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConversions.rejected, (state, action) => {
        state.loading = false;
        // Why is payload not `string` as defined in rejectValue from createAsyncThunk?
        state.error = action.payload as string;
      })
      .addCase(getConversions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.baseCurrency = action.payload.base;
        state.conversions = {
          ...state.conversions,
          [action.payload.base]: { ...action.payload },
        };
      });
  },
});
/* eslint-enable no-param-reassign */

export const currencyReducer = currencySlice.reducer;

const {
  swap_internal,
  changeBase_internal,
  ...sliceActionsToExport
} = currencySlice.actions;

export const currencyActions = {
  ...sliceActionsToExport,
  getConversions,
  swap,
  changeBase,
};

// SELECTOR

const useBaseCurrencySelector = () =>
  useAppSelector((state) => state.currency.baseCurrency);

const useQuoteCurrencySelector = () =>
  useAppSelector((state) => state.currency.quoteCurrency);

const useAmountSelector = () =>
  useAppSelector((state) => state.currency.amount);

const useLoadingSelector = () =>
  useAppSelector((state) => state.currency.loading);

const useErrorSelector = () => useAppSelector((state) => state.currency.error);

const useConversionsSelector = () =>
  useAppSelector((state) => state.currency.conversions);

export const currencySelectors = {
  useBaseCurrencySelector,
  useQuoteCurrencySelector,
  useAmountSelector,
  useLoadingSelector,
  useErrorSelector,
  useConversionsSelector,
};
