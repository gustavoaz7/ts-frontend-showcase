import { createAction } from '../helpers';
import { THEME_VARIANT_ACTION_TYPES } from '../action-types/theme-variant';
import { THEME_VARIANTS } from '../../config/themes';

export const changeThemeVariantAC = (payload: THEME_VARIANTS) =>
  createAction(THEME_VARIANT_ACTION_TYPES.CHANGE_VARIANT, payload);
