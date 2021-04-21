import React, { FC, MouseEvent } from 'react';
import styled, { withTheme } from 'styled-components';

type ButtonProps = {
  onClick(event: MouseEvent): void;
  className?: string;
};

export const Button: FC<ButtonProps> = ({
  onClick = () => {},
  className,
  children,
}) => (
  <StyledButton onClick={onClick} className={className}>
    {children}
  </StyledButton>
);

const StyledButton = withTheme(styled.div`
  cursor: pointer;
  user-select: none;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  overflow: hidden;
  padding-right: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.5);
  }
`);
