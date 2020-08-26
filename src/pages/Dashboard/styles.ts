import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 2rem 0;
  background: #25262e;
`;

export const HeaderContent = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  align-items: center;

  /* imagem filha direta de HeaderContent */
  > img {
    height: 5rem;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    line-height: 1.5rem;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 70rem;
  margin: 4rem auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 7.5rem;

  > h1 {
    font-size: 2.5rem;
  }
  > p {
    margin-top: 0.5rem;
    color: #ff9000;
  }
  span + span::before {
    content: '';
    border-left: 1px solid #ff9000;
    margin-left: 0.5rem;
    padding-left: 0.5rem;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 4rem;

  > strong {
    color: #999591;
    font-size: 1.5rem;
    font-weight: 400;
  }

  div {
    position: relative;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin-top: 1.5rem;

    &::before {
      position: absolute;
      content: '';
      height: 80%;
      width: 2px;
      background: #ff9000;
      left: 0;
      top: 10%;
    }

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      margin-right: 1.5rem;
    }

    strong {
      font-size: 1.5rem;
      color: #f4ede8;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;

      svg {
        color: #ff9000;
        margin-right: 0.5rem;
      }
    }
  }
`;

export const Section = styled.div`
  margin-top: 3rem;
  flex: 1;

  > strong {
    display: block;
    font-size: 1.25rem;
    color: #999591;
    line-height: 1.625rem;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #3e3b47;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 1rem;
  }

  > span {
    display: flex;
    align-items: center;
    margin-right: 1.625rem;
    color: #f4ede8;

    svg {
      color: #ff9000;
      margin-right: 0.5rem;
    }
  }

  > div {
    flex: 1;
    display: flex;
    align-items: center;
    background: #3e3b47;
    padding: 1rem;
    border-radius: 10px;

    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      margin-right: 1rem;
    }
  }
`;
