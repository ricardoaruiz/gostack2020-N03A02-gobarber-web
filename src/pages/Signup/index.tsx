import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';

import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import * as S from './styles';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleFormSubmit: SubmitHandler<FormData> = useCallback(async data => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('Campo obrigatório'),
        password: Yup.string().min(
          6,
          'Senha deve possuir no mínimo 6 caracteres',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors = getValidationErrors(err);
      formRef.current?.setErrors(validationErrors);
    }
  }, []);

  return (
    <S.Container>
      <S.Background />
      <S.Content>
        <img src={logo} alt="GoBarber" />

        {/* <ul>
        <li className="active">Sou cliente</li>
        <li>Sou cabeleireiro</li>
      </ul> */}

        <Form onSubmit={handleFormSubmit} ref={formRef}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="email" placeholder="E-mail" icon={FiMail} />
          <Input name="password" placeholder="Senha" icon={FiLock} />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="ddd">
          <FiArrowLeft size={16} />
          Voltar para Logon
        </a>
      </S.Content>
    </S.Container>
  );
};

export default SignUp;
