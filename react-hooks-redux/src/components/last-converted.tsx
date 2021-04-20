import React, { FC } from 'react';
import styled from 'styled-components';
import { TCurrencies } from '../config/currencies';

type LastConvertedProps = {
  base: TCurrencies;
  quote: TCurrencies;
  rate: number;
  date: Date;
};

export const LastConverted: FC<LastConvertedProps> = ({
  base,
  quote,
  rate,
  date,
}) => (
  <Container>
    <span>
      {`1 ${base} = ${rate.toFixed(
        5,
      )} ${quote} as of $${Intl.DateTimeFormat().format(date)}`}
    </span>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
`;
