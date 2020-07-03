import styled from 'styled-components';
import { darken } from 'polished';

import backgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 43.5rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    width: 21rem;
    text-align: center;

    h1 {
      margin: 1.5rem;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 1rem;
      width: 100%;
      color: #f4ede8;

      &::placeholder {
        color: #666360;
      }

      & + input {
        margin-top: 0.5rem;
      }
    }

    button {
      background: #ff9000;
      height: 3.5rem;
      border-radius: 10px;
      border: 0;
      margin: 0.5rem 0;
      padding: 0 1rem;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      transition: background-color 0.3s;

      &:hover {
        background: ${darken(0.1, '#ff9000')};
      }
    }
    a {
      color: #f4ede8;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: ${darken(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;
    color: #ff9000;
    text-decoration: none;
    transition: color 0.3s;

    svg {
      margin-right: 0.5rem;
    }

    &:hover {
      color: ${darken(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
`;
