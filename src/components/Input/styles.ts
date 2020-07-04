import styled from 'styled-components';

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

  svg {
    margin-right: 1rem;
    color: #666360;
  }

  &.filled {
    svg {
      color: #ff9000;
    }
  }
  &.focused {
    border: 2px solid #ff9000;
    svg {
      color: #ff9000;
    }
  }
`;
