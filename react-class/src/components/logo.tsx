import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png'


export const Logo = () => (
  <Container>
    <Image
      src={logo}
      alt="logo"
    />
    <Title>{'Currency Converter'}</Title>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  filter: invert(100%);
  max-width: 200px;
`;

const Title = styled.h1`
  color: white;
  margin-top: 10px;
`;
