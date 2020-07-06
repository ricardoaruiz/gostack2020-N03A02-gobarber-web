import styled, { css } from 'styled-components';

interface ToasProps {
  type?: 'info' | 'success' | 'error';
}

const toastVariations = {
  info: css`
    background-color: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background-color: green;
    color: #fff;
  `,
  error: css`
    background-color: red;
    color: #fff;
  `,
};

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
`;

export const Toast = styled.div<ToasProps>`
  position: relative;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  width: 22rem;
  background-color: #ebf8ff;
  color: #3172b7;
  border-radius: 0.5rem;

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
