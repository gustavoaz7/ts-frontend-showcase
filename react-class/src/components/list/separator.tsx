import styled, { withTheme } from 'styled-components';


export const Separator = withTheme(styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`);
