import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/useToast';
import getValidationErrors from '../../utils/getValidationErrors';
import * as S from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const initialData = {
  email: 'usuario@email.com',
  password: '654321',
};

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<ForgotPasswordFormData> = useCallback(
    async data => {
      const { email } = data;
      try {
        setLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Campo obrigatório')
            .email('E-mail inválido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', { email });
        addToast({
          type: 'success',
          message:
            'Enviamos um e-mail para recuperaçao de senha. Verifique seus e-mails',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          message: 'Ocorreu um erro ao tentar realizar a recuperação de senha',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, setLoading],
  );

  return (
    <S.Container>
      <S.Content>
        <S.AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form onSubmit={handleSubmit} ref={formRef} initialData={initialData}>
            <h1>Recupear senha</h1>
            <Input
              name="email"
              type="text"
              placeholder="E-mail"
              icon={FiMail}
            />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn size={16} />
            Voltar ao login
          </Link>
        </S.AnimationContainer>
      </S.Content>
      <S.Background />
    </S.Container>
  );
};

export default ForgotPassword;
