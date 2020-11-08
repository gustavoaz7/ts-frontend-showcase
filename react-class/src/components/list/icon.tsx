import React, { FC } from 'react';
import styled from 'styled-components';
import { PRIMARY_COLOR } from '../../styles';
import check from '../../assets/check.png';

type IconProps = {
  visible?: boolean;
  checkmark?: boolean;
}

export const Icon: FC<IconProps> = ({ visible, checkmark }) => {
  if (!visible) {
    return null;
  }

  return (
    <StyledIcon>
      {checkmark && (
        <Check src={check} />
      )}
    </StyledIcon>
  );
};

const StyledIcon = styled.div`
  background-color: ${PRIMARY_COLOR};
  width: 30px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Check = styled.img`
  width: 18px;
`;
