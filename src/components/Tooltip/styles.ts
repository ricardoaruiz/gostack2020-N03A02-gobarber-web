import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  &:hover {
    span {
      opacity: 1;
      visibility: visible;
    }
  }

  &.info {
    span {
      background: #cb7322;

      &::before {
        border-top: 5px solid #cb7322;
      }
    }
  }

  &.error {
    span {
      background: #b0342f;

      &::before {
        border-top: 5px solid #b0342f;
      }
    }
  }

  span {
    position: absolute;
    width: 10rem;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;

    /* posiciont o bottom do span acima do topo do container */
    bottom: calc(100% + 0.5rem);

    /* centraliza o span bem no meio do container */
    left: 50%;
    transform: translateX(-50%);

    /* incia o tooltip escondido */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s;

    /* constroi a seta apontando para baixo */
    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #cb7322;

      /* posiciona a seta abaixo do bottom do span */
      bottom: -5px;

      /* centraliza a seta bem no meio do span */
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;
