import {
  createAsyncThunk,
  createSlice,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import { TCurrencies, TCurrencyApi } from '../config/currencies';
import type { RootState } from './store';
import { getCurrencyConversions } from '../services/currency';

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
  const hasCurrentConversion = conversionsSelector(state)[payload];
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
  const newBase = baseCurrencySelector(state);
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

const selector = (state: RootState) => state.currency;

const baseCurrencySelector = (state: RootState) => selector(state).baseCurrency;

const quoteCurrencySelector = (state: RootState) =>
  selector(state).quoteCurrency;

const amountSelector = (state: RootState) => selector(state).amount;

const loadingSelector = (state: RootState) => selector(state).loading;

const errorSelector = (state: RootState) => selector(state).error;

const conversionsSelector = (state: RootState) => selector(state).conversions;

export const currencySelectors = {
  baseCurrencySelector,
  quoteCurrencySelector,
  amountSelector,
  loadingSelector,
  errorSelector,
  conversionsSelector,
};
