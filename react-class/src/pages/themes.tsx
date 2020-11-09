import React, { Component, Fragment } from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import { ROUTES } from '../config/routes';
import {
  PRIMARY_BLUE,
  PRIMARY_ORANGE,
  PRIMARY_GREEN,
  PRIMARY_PURPLE,
} from '../styles';

class ThemesClass extends Component<RouteComponentProps, {}> {
  handleThemeChange(color: string) {
    // TODO: change color
    this.props.history.push(ROUTES.OPTIONS);
  }

  render() {
    return (
      <Fragment>
        <ListItem
          text="Blue"
          onClick={() => this.handleThemeChange(PRIMARY_BLUE)}
          iconColor={PRIMARY_BLUE}
          selected
          checkmark={false}
        />
        <Separator />
        <ListItem
          text="Orange"
          onClick={() => this.handleThemeChange(PRIMARY_ORANGE)}
          iconColor={PRIMARY_ORANGE}
          selected
          checkmark={false}
        />
        <Separator />
        <ListItem
          text="Green"
          onClick={() => this.handleThemeChange(PRIMARY_GREEN)}
          iconColor={PRIMARY_GREEN}
          selected
          checkmark={false}
        />
        <Separator />
        <ListItem
          text="Purple"
          onClick={() => this.handleThemeChange(PRIMARY_PURPLE)}
          iconColor={PRIMARY_PURPLE}
          selected
          checkmark={false}
        />
        <Separator />
      </Fragment>
    )
  }
}

export const Themes = withRouter(ThemesClass);
