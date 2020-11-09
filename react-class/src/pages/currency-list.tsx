import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import { currencies } from '../config/currencies';
import { ListItem } from '../components/list/list-item';
import { Separator } from '../components/list/separator';
import { PRIMARY_BLUE } from '../styles';


export const CurrencyList = withRouter(({ history }) => (
  <Container>
    {currencies.map((currency, i) => (
      <Fragment key={currency}>
        {i !== 0 && <Separator />}
        <ListItem
          text={currency}
          selected={currency === 'CAD'}
          onClick={history.goBack}
          iconColor={PRIMARY_BLUE}
        />
      </Fragment>
    ))}
  </Container>
));

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
