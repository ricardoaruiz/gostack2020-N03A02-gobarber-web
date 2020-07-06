import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as S from './styles';

interface SigninFormData {
  email: string;
  password: string;
}

const initialData = {
  email: 'usuario@email.com',
  password: '654321',
};

const Signin: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast, removeAllToasts } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<SigninFormData> = useCallback(
    async data => {
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

        await signIn({
          email: data.email,
          password: data.password,
        });

        removeAllToasts();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({ type: 'error', message: error.message });
      }
    },
    [removeAllToasts, addToast, signIn],
  );

  return (
    <S.Container>
      <S.Content>
        <S.AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form onSubmit={handleSubmit} ref={formRef} initialData={initialData}>
            <h1>Faça seu Login</h1>
            <Input
              name="email"
              type="text"
              placeholder="E-mail"
              icon={FiMail}
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />
            <Button type="submit">Entrar</Button>
            <a href="forgot-password">Esqueci minha senha</a>
          </Form>

          <Link to="signup">
            <FiLogIn size={16} />
            Criar conta
          </Link>
        </S.AnimationContainer>
      </S.Content>
      <S.Background />
    </S.Container>
  );
};

export default Signin;
