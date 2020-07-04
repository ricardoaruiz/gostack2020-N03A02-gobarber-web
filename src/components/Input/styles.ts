import styled from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  className?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 1rem;
  width: 100%;

  & + div {
    margin-top: 0.5rem;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  .icon {
    margin-right: 1rem;
    color: #666360;
  }

  &.filled {
    .icon {
      color: #ff9000;
    }
  }
  &.focused {
    border: 2px solid #ff9000;
    .icon {
      color: #ff9000;
    }
  }
  &.error {
    border: 2px solid #c53030;
  }
`;

export const Error = styled(Tooltip)`
  height: 1.25rem;
  margin-left: 1rem;
  svg {
    margin: 0;
    cursor: pointer;
    color: #c53030;
`;
