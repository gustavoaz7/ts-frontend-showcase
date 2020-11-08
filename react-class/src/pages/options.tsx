import React, { FC, Fragment } from 'react';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';


export const Options: FC<{}> = () => (
  <Fragment>
    <ListItem
      text="Themes"
      onClick={() => {}}
    />
    <Separator />
    <ListItem
      text="Exchangeratesapi.io"
      onClick={() => {}}
    />
  </Fragment>
);
