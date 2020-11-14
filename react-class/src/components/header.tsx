import React, { FC } from 'react';
import styled, { withTheme } from 'styled-components'
import { Link } from "react-router-dom";
import gear from '../assets/gear.png'
import { ROUTES } from '../config/routes';


export const Header: FC = () => (
  <Container to={ROUTES.OPTIONS}>
    <Image src={gear} />
  </Container>
);

const GEAR_SIZE = 30;
const Container = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border-radius: ${GEAR_SIZE}px;
`;

const Image = withTheme(styled.img`
  width: ${GEAR_SIZE}px;
  margin: 6px;
  ${({ theme }) => theme.invertImage && 'filter: invert(100%)'};
`);
