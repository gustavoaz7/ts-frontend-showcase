import { createAction } from '../helpers';
import { CHANGE_THEME_COLOR } from '../constants';
import { THEME_VARIANTS } from '../../config/themes';

export const changeThemeVariantAC = (payload: THEME_VARIANTS) =>
  createAction(CHANGE_THEME_COLOR, payload);
