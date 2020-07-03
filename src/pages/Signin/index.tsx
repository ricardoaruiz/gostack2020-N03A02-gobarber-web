import React from 'react';

import { FiLogIn } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import * as S from './styles';

const Signin: React.FC = () => (
  <S.Container>
    <S.Content>
      <img src={logo} alt="GoBarber" />

      <form action="">
        <h1>Faça seu Login</h1>
        <input type="text" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
        <a href="forgot-password">Esqueci minha senha</a>
      </form>
      <a href="create-account">
        <FiLogIn size={16} />
        Criar conta
      </a>
    </S.Content>
    <S.Background />
  </S.Container>
);

export default Signin;
