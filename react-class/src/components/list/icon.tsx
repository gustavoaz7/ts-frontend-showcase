import React, { FC } from 'react';
import styled, { withTheme } from 'styled-components';
import check from '../../assets/check.png';

type IconProps = {
  visible?: boolean;
  checkmark?: boolean;
  color?: string;
}

export const Icon: FC<IconProps> = ({
  visible = false,
  checkmark = false,
  color,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <StyledIcon color={color}>
      {checkmark && (
        <Check src={check} />
      )}
    </StyledIcon>
  );
};

const StyledIcon = styled.div<{color?: string}>`
  background-color: ${({ color }) => color};
  width: 30px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Check = withTheme(styled.img`
  width: 18px;
  ${({ theme }) => theme.invertImage && 'filter: invert(100%)'};
`);
