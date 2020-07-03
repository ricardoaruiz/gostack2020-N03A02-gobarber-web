import styled from 'styled-components';
import { shade } from 'polished';

import background from '../../assets/sign-up-background.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 38rem;
  padding: 1rem 5rem;

  ul {
    display: flex;
    list-style: none;
    margin: 3rem 0;

    li {
      padding: 0.5rem 0;
      cursor: pointer;
      color: #999591;
      transition: color 0.3s;

      &.active {
        border-bottom: 2px solid #ff9000;
        color: #f4ede8;
      }

      & + li {
        margin-left: 1.5rem;
      }

      &:hover {
        color: ${shade(0.2, '#999591')};
      }
    }
  }

  form {
    width: 21rem;
    text-align: center;
    h1 {
      margin: 1.5rem 0;
      font-size: 1.5rem;
    }
  }

  a {
    display: flex;
    align-items: center;
    color: #f4ede8;
    text-decoration: none;

    svg {
      margin-right: 0.5rem;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;
