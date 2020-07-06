import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToasProps {
  type?: 'info' | 'success' | 'error';
}

const toastVariations = {
  info: css`
    background-color: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background-color: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background-color: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div) <ToasProps>`
  position: relative;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  width: 22rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  ${props => toastVariations[props.type || 'info']}

  & + div {
    margin-top: 0.5rem;
  }

  > svg {
    position: relative;
    top: 0.25rem;
    margin-right: 0.5rem;
  }

  span {
    font-weight: 700;
  }

  p {
    margin-left: 1.8rem;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  button {
    position: absolute;
    top: 0.625rem;
    right: 0.5rem;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: inherit;
  }
`;
