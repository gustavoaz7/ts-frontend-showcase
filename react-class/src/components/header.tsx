import React, { FC, MouseEvent } from 'react';
import styled from 'styled-components'
import gear from '../assets/gear.png'

type HeaderProps = {
  onClick(event: MouseEvent): void;
}

export const Header: FC<HeaderProps> = ({ onClick = () => {} }) => (
  <Container>
    <Button onClick={onClick}>
      <Image src={gear} />
    </Button>
  </Container>
);

const GEAR_SIZE = 20;
const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Button = styled.div`
  cursor: pointer;
  align-self: flex-end;
  border-radius: ${GEAR_SIZE}px;
  overflow: hidden;
  margin-right: 10px;
  margin-top: 10px;
`;

const Image = styled.img`
  width: ${GEAR_SIZE}px;
  margin: 6px;
`;
