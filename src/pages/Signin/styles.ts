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
    margin: 3rem 0;
    width: 21rem;
    text-align: center;

    h1 {
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
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
