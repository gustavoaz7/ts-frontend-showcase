import React, { FC, Fragment } from 'react';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import {
  PRIMARY_BLUE,
  PRIMARY_ORANGE,
  PRIMARY_GREEN,
  PRIMARY_PURPLE,
} from '../styles';

export const Themes: FC<{}> = () => (
  <Fragment>
    <ListItem
      text="Blue"
      onClick={() => {}}
      iconColor={PRIMARY_BLUE}
      selected
      checkmark={false}
    />
    <Separator />
    <ListItem
      text="Orange"
      onClick={() => {}}
      iconColor={PRIMARY_ORANGE}
      selected
      checkmark={false}
    />
    <Separator />
    <ListItem
      text="Green"
      onClick={() => {}}
      iconColor={PRIMARY_GREEN}
      selected
      checkmark={false}
    />
    <Separator />
    <ListItem
      text="Purple"
      onClick={() => {}}
      iconColor={PRIMARY_PURPLE}
      selected
      checkmark={false}
    />
    <Separator />
  </Fragment>
);
