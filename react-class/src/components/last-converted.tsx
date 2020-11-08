import React, { FC } from 'react';
import styled from 'styled-components'
import { format } from 'date-fns'


type LastConvertedProps = {
  base: string;
  quote: string;
  rate: number;
  date: Date;
}

export const LastConverted: FC<LastConvertedProps> = ({ base, quote, rate, date }) => (
  <Container>
    <Text>
      {`1 ${base} = ${rate} ${quote} as of ${format(date, 'MMMM, dd, yyyy')}`}
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
