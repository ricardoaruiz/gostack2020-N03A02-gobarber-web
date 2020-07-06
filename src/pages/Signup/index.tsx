import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import * as S from './styles';

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
      if (err instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(err);
        formRef.current?.setErrors(validationErrors);
      }
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

        <Link to="/">
          <FiArrowLeft size={16} />
          Voltar para Logon
        </Link>
      </S.Content>
    </S.Container>
  );
};

export default SignUp;
