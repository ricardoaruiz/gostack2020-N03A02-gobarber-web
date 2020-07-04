import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import * as S from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // const initialData = {
  //   email: 'ricardo.almendro.ruiz@gmail.com',
  //   password: '123456',
  // };

  const handleSubmit: SubmitHandler<FormData> = useCallback(async data => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Campo obrigatório')
          .email('E-mail inválido'),
        password: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <S.Container>
      <S.Content>
        <img src={logo} alt="GoBarber" />

        {/* <Form onSubmit={handleSubmit} initialData={initialData} ref={formRef}> */}
        <Form onSubmit={handleSubmit} ref={formRef}>
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
