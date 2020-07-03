import React from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import * as S from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Signin: React.FC = () => (
  <S.Container>
    <S.Content>
      <img src={logo} alt="GoBarber" />

      <form action="">
        <h1>Faça seu Login</h1>
        <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          icon={FiLock}
        />
        <Button type="submit">Entrar</Button>
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
