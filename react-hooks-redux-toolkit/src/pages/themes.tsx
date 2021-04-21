import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import { ROUTES } from '../config/routes';
import { themeVariantActions } from '../redux/theme-variant';
import {
  THEME_VARIANTS,
  blueTheme,
  orangeTheme,
  greenTheme,
  purpleTheme,
} from '../config/themes';
import { useAppDispatch } from '../redux/hooks';

const THEMES_LIST = [
  { text: THEME_VARIANTS.BLUE, iconColor: blueTheme.colors.primary },
  { text: THEME_VARIANTS.ORANGE, iconColor: orangeTheme.colors.primary },
  { text: THEME_VARIANTS.GREEN, iconColor: greenTheme.colors.primary },
  { text: THEME_VARIANTS.PURPLE, iconColor: purpleTheme.colors.primary },
];

export function Themes() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleThemeChange = useCallback(
    (...args: Parameters<typeof themeVariantActions.changeVariant>) => {
      dispatch(themeVariantActions.changeVariant(...args));
      history.push(ROUTES.HOME);
    },
    [dispatch, history],
  );

  return (
    <>
      {THEMES_LIST.map((themeItem) => (
        <>
          <ListItem
            text={themeItem.text}
            onClick={handleThemeChange}
            iconColor={themeItem.iconColor}
            selected
            checkmark={false}
          />
          <Separator />
        </>
      ))}
    </>
  );
}
