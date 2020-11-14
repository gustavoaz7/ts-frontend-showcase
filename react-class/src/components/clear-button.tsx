import React, { FC, MouseEvent } from 'react';
import styled, { withTheme } from 'styled-components'
import logo from '../assets/logo.png'

type ClearButtonProps = {
  text: string;
  onClick(event: MouseEvent): void;
  className?: string;
}

export const ClearButton: FC<ClearButtonProps> = ({
  text,
  onClick = () => {},
  className,
}) => (
  <Button onClick={onClick} className={className}>
    <Container>
      <Image src={logo} />
      <Text>{text}</Text>
    </Container>
  </Button>
);

const Button = withTheme(styled.div`
  cursor: pointer;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  padding-right: 10px;
  &:hover {
    background-color: rgba(255,255,255, 0.2);
  }
  &:active {
    background-color: rgba(255,255,255, 0.5);
  }
`);

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Image = withTheme(styled.img`
  width: 20px;
  height: 20px;
  ${({ theme }) => theme.invertImage && 'filter: invert(100%)'};
  margin: 10px;
`);

const Text = withTheme(styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`);