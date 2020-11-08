import React, { FC, MouseEvent} from 'react';
import styled from 'styled-components';
import { Icon } from './icon';

type ListItemProps = {
  text: string;
  selected?: boolean;
  onClick(event: MouseEvent): void;
  showIcon?: boolean;
  checkmark?: boolean;
}

export const ListItem: FC<ListItemProps> = ({
  text,
  onClick,
  selected = false,
  showIcon = true,
  checkmark = true,
}) => (
  <Container onClick={onClick}>
    <Text>{text}</Text>
    {selected ? <Icon visible={showIcon} checkmark={checkmark} /> : <Icon />}
  </Container>
);

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
`;

const Text = styled.span`
  font-size: 16px;
  color: #333;
`;
