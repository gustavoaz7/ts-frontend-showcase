import React, { FC } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png'


export const Logo: FC = () => (
  <Container>
    <Image
      src={logo}
      alt="logo"
    />
    <h1>{'Currency Converter'}</h1>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  max-width: 200px;
  margin-bottom: 10px;
`;
