import React, { FC, ChangeEvent } from 'react';
import styled, { withTheme } from 'styled-components';
import { TCurrencies } from '../config/currencies';

type CurrencyInputProps = {
  currency: TCurrencies;
  onClick: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
  className?: string;
};

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
      <Button onClick={onClick}>
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

const Container = withTheme(styled.div<{ disabled: boolean }>`
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
  ${({ disabled, theme }) =>
    disabled && `background-color: ${theme.colors.lightGray};`}
`);

const Button = withTheme(styled.div`
  cursor: pointer;
  height: ${HEIGHT}px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`);

const Separator = withTheme(styled.div`
  height: ${HEIGHT}px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.gray};
`);

const Text = withTheme(styled.span`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 20px;
  font-weight: 600;
  padding: 0 12px;
`);

const Input = withTheme(styled.input`
  flex: 1;
  height: 100%;
  border: none;
  font-size: 18px;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.darkGray};
`);
