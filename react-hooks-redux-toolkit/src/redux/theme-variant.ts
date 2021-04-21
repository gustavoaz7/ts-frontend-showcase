import { createSlice } from '@reduxjs/toolkit';
import { THEME_VARIANTS } from '../config/themes';
import { useAppSelector } from './hooks';

const SLICE_NAME = '@@THEME_VARIANT';

const initialState: THEME_VARIANTS = THEME_VARIANTS.BLUE;

/* eslint-disable no-param-reassign */
export const themeVariantSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    changeVariant: (state, action) => action.payload,
  },
});
/* eslint-enable no-param-reassign */

export const themeVariantReducer = themeVariantSlice.reducer;

export const themeVariantActions = themeVariantSlice.actions;

export const useThemeVariantSelector = () =>
  useAppSelector((state) => state.themeVariant);
