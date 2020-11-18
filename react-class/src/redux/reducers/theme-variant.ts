import { Reducer } from 'redux';
import { THEME_VARIANT_ACTION_TYPES } from '../action-types/theme-variant';
import * as themeVariantActions from '../actions/theme-variant';
import { ExtractActions } from '../types';
import { THEME_VARIANTS } from '../../config/themes';

const initialState: THEME_VARIANTS = THEME_VARIANTS.BLUE;

type ThemeVariantActions = ExtractActions<
  typeof themeVariantActions[keyof typeof themeVariantActions]
>;

export const themeVariantReducer: Reducer<
  THEME_VARIANTS,
  ThemeVariantActions
> = (state = initialState, action) => {
  switch (action.type) {
    case THEME_VARIANT_ACTION_TYPES.CHANGE_VARIANT:
      return action.payload;
    default:
      return state;
  }
};
