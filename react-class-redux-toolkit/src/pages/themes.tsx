import React, { Component, Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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

const mapDispatch = {
  changeTheme: themeVariantActions.changeVariant,
};

const connector = connect(null, mapDispatch);

type ThemeProps = ConnectedProps<typeof connector> & RouteComponentProps;

class ThemesClass extends Component<ThemeProps, unknown> {
  handleThemeChange = (color: THEME_VARIANTS) => {
    const { changeTheme, history } = this.props;

    changeTheme(color);
    history.push(ROUTES.HOME);
  };

  render() {
    return (
      <>
        <ListItem
          text={THEME_VARIANTS.BLUE}
          onClick={this.handleThemeChange}
          iconColor={blueTheme.colors.primary}
          selected
          checkmark={false}
        />
        <Separator />
        <ListItem
          text={THEME_VARIANTS.ORANGE}
          onClick={this.handleThemeChange}
          iconColor={orangeTheme.colors.primary}
          selected
          checkmark={false}
        />
        <Separator />
        <ListItem
          text={THEME_VARIANTS.GREEN}
          onClick={this.handleThemeChange}
          iconColor={greenTheme.colors.primary}
          selected
          checkmark={false}
        />
        <Separator />
        <ListItem
          text={THEME_VARIANTS.PURPLE}
          onClick={this.handleThemeChange}
          iconColor={purpleTheme.colors.primary}
          selected
          checkmark={false}
        />
        <Separator />
      </>
    );
  }
}

export const Themes = connector(withRouter(ThemesClass));
