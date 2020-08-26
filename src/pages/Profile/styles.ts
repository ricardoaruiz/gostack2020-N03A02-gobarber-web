import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  header {
    background-color: #28262e;
    height: 9rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    div {
      flex: 1;
      max-width: 75rem;
      margin: 0 auto;
      padding: 0 2rem;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: #999591;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -7rem;

  width: 100%;
  padding: 1rem 5rem;

  form {
    width: 21rem;
    text-align: center;

    h1 {
      margin: 1.5rem 0;
      font-size: 1.25rem;
      text-align: left;
    }

    > div:nth-child(3) {
      margin-bottom: 1.25rem;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 2rem;
  position: relative;
  img {
    width: 11.625rem;
    height: 11.625rem;
    border-radius: 50%;
  }

  button {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    outline: none;
    background-color: #f99000;
    position: absolute;
    top: 8rem;
    right: 4.5rem;
    transition: all 0.3s;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#f99000')};
    }
  }
`;
