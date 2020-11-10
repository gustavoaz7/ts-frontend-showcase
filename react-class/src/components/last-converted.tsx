import React, { FC } from 'react';
import styled from 'styled-components'
import { format } from 'date-fns'
import { TCurrencies } from '../config/currencies';


type LastConvertedProps = {
  base: TCurrencies;
  quote: TCurrencies;
  rate: number;
  date: Date;
}

export const LastConverted: FC<LastConvertedProps> = ({ base, quote, rate, date }) => (
  <Container>
    <Text>
      {`1 ${base} = ${rate.toFixed(5)} ${quote} as of ${format(date, 'MMM, dd, yyyy')}`}
    </Text>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  color: white;
`;
