import React, { FC, ChangeEvent } from 'react';
import styled from 'styled-components';
import {
  PRIMARY_COLOR,
  LIGHT_GRAY,
  GRAY,
  DARK_GRAY,
} from '../styles'

type CurrencyInputProps = {
  currency: string;
  onClick: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
  className?: string;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
  currency,
  onClick = () => {},
  onChange = () => {},
  disabled = false,
  value,
  className,
}) => {
  return (
    <Container className={className} disabled={disabled}>
      <Button
        onClick={onClick}
      >
        <Text>{currency}</Text>
      </Button>
      <Separator />
      <Input
        type="number"
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </Container>
  );
};

const HEIGHT = 50;
const BORDER_RADIUS = 4;

const Container = styled.div<{disabled: boolean}>`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  width: 80%;
  max-width: 400px;
  height: ${HEIGHT}px;
  border-radius: ${BORDER_RADIUS}px;
  align-items: center;
  margin: 10px 0;
  overflow: hidden;
  ${({ disabled }) => disabled && `
    background-color: ${LIGHT_GRAY};
  `}
`;

const Button = styled.div`
  cursor: pointer;
  height: ${HEIGHT}px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${LIGHT_GRAY};
  }
  &:active {
    background-color: ${GRAY};
  }
`;

const Separator = styled.div`
  height: ${HEIGHT}px;
  width: 1px;
  background-color: ${GRAY};
`;

const Text = styled.span`
  color: ${PRIMARY_COLOR};
  font-size: 20px;
  font-weight: 600;
  padding: 0 12px;
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  font-size: 18px;
  padding: 0 10px;
  color: ${DARK_GRAY};
`;
