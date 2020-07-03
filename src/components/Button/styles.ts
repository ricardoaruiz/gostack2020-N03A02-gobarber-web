import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  height: 3.5rem;
  border-radius: 10px;
  border: 0;
  margin: 1.5rem 0;
  padding: 0 1rem;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background: ${darken(0.1, '#ff9000')};
  }
`;
