import React, { FC } from 'react';
import styled from 'styled-components';


type LoadingProps = {
  overlay?: boolean;
}

export const Loading: FC<LoadingProps> = ({ overlay }) => (
  overlay ? <Overlay><Spinner/></Overlay> : <Spinner />
);

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const Spinner = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  border: solid 5px transparent;
  border-radius: 50%;
  border-right-color: var(--color-primary);
  border-top-color: var(--color-primary);
  animation: spin 1s infinite linear;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
