import React from 'react';

import {
  FiUser, FiMail, FiLock, FiArrowLeft
} from 'react-icons/fi';
import * as S from './styles';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <S.Container>
    <S.Background />
    <S.Content>
      <img src={logo} alt="GoBarber" />

      {/* <ul>
        <li className="active">Sou cliente</li>
        <li>Sou cabeleireiro</li>
      </ul> */}

      <form action="signup">
        <h1>Faça seu cadastro</h1>
        <Input name="name" placeholder="Nome" icon={FiUser} />
        <Input name="email" placeholder="E-mail" icon={FiMail} />
        <Input name="password" placeholder="Senha" icon={FiLock} />
        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="ddd">
        <FiArrowLeft size={16} />
        Voltar para Logon
      </a>
    </S.Content>
  </S.Container>
);

export default SignUp;
