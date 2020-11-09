import React from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import gear from '../assets/gear.png'
import { ROUTES } from '../config/routes';


export const Header = () => (
  <Container to={ROUTES.OPTIONS}>
    <Image src={gear} />
  </Container>
);

const GEAR_SIZE = 20;
const Container = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border-radius: ${GEAR_SIZE}px;
`;

const Image = styled.img`
  width: ${GEAR_SIZE}px;
  margin: 6px;
`;
