import React, { FC } from 'react';
import styled, { withTheme } from 'styled-components';
import logo from '../assets/logo.png'


export const Logo: FC = () => (
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

const Image = withTheme(styled.img`
  ${({ theme }) => theme.invertImage && 'filter: invert(100%)'};
  max-width: 200px;
`);

const Title = withTheme(styled.h1`
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 10px;
`);
