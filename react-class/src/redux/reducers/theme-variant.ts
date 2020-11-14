import { Reducer } from 'redux';
import { CHANGE_THEME_COLOR } from '../constants';
import * as themeVariantActions from '../actions/theme-variant';
import { ExtractActions } from '../types';
import { THEME_VARIANTS } from '../../config/themes';


const initialState: THEME_VARIANTS = THEME_VARIANTS.BLUE

type ThemeVariantActions = ExtractActions<
  typeof themeVariantActions[keyof typeof themeVariantActions]
>;

export const themeVariantReducer: Reducer<THEME_VARIANTS, ThemeVariantActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CHANGE_THEME_COLOR:
      return action.payload;
    default:
      return state;
  }
};
