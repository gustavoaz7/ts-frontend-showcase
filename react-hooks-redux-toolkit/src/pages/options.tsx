import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import { ROUTES } from '../config/routes';

export function Options() {
  const history = useHistory();
  const handleThemeClick = useCallback(() => history.push(ROUTES.THEMES), [
    history,
  ]);
  const handleApiClick = useCallback(
    () => window.open('https://exchangeratesapi.io', '_blank'),
    [],
  );

  return (
    <>
      <ListItem text="Themes" onClick={handleThemeClick} />
      <Separator />
      <ListItem text="Exchangeratesapi.io" onClick={handleApiClick} />
    </>
  );
}
