import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import { ROUTES } from '../config/routes';


export const Options = withRouter(({ history }) => (
  <Fragment>
    <ListItem
      text="Themes"
      onClick={() => history.push(ROUTES.THEMES)}
    />
    <Separator />
    <ListItem
      text="Exchangeratesapi.io"
      onClick={() => window.open('https://exchangeratesapi.io', '_blank')}
    />
  </Fragment>
));
