import React, { Fragment } from 'react';
import styled from 'styled-components';
import { currencies } from '../config/currencies';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';


export const CurrencyList = () => (
  <Container>
    {currencies.map((currency, i) => (
      <Fragment key={currency}>
        {i !== 0 && <Separator />}
        <ListItem
          text={currency}
          selected={currency === 'CAD'}
          onClick={() => {}}
        />
      </Fragment>
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
