import React, { FC } from 'react';
import styled, { withTheme } from 'styled-components';

type AlertProps = {
  message: string;
};

export const Alert: FC<AlertProps> = ({ message }) => (
  <Container>{message}</Container>
);

const Container = withTheme(styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 10px;
  right: 10px;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  z-index: 9;
  ${({ theme }) => `
    background-color: ${theme.colors.error};
  `}
`);
