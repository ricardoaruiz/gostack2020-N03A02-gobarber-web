import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logo from '../../assets/logo.svg';

import * as S from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Signin: React.FC = () => {
  const initialData = {
    email: 'ricardo.almendro.ruiz@gmail.com',
    password: '123456',
  };

  const handleSubmit = (data: object): void => {
    console.log('submit', data);
  };
  return (
    <S.Container>
      <S.Content>
        <img src={logo} alt="GoBarber" />

        <Form onSubmit={handleSubmit} initialData={initialData}>
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
        </Form>

        <a href="create-account">
          <FiLogIn size={16} />
          Criar conta
        </a>
      </S.Content>
      <S.Background />
    </S.Container>
  );
};

export default Signin;
