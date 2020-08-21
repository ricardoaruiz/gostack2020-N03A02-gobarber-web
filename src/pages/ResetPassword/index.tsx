import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import queryString from 'query-string';
import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/useToast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import * as S from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const initialData = {
  password: '',
  password_confirmation: '',
};

const ResetPassword: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { search } = useLocation();

  const formRef = useRef<FormHandles>(null);
  const { token } = queryString.parse(search);

  const handleSubmit: SubmitHandler<ResetPasswordFormData> = useCallback(
    async data => {
      try {
        if (!token) {
          addToast({
            type: 'error',
            message:
              'Token de troca de senha não identificado. Solicite um novo e-mail para a troca de senha',
          });
          return;
        }

        const schema = Yup.object().shape({
          password: Yup.string().required('Campo obrigatório'),
          password_confirmation: Yup.string()
            .required('Campo obrigatório')
            .oneOf([Yup.ref('password')], 'As senhas não conferem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        await api.post('/password/reset', {
          token,
          password,
          password_confirmation,
        });

        addToast({
          type: 'success',
          message: 'Senha alterada com sucesso.',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          message: 'Ocorreu um erro ao reiniciar sua senha senha',
        });
      }
    },
    [addToast, history, token],
  );

  return (
    <S.Container>
      <S.Content>
        <S.AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form onSubmit={handleSubmit} ref={formRef} initialData={initialData}>
            <h1>Reiniciar senha</h1>
            <Input
              name="password"
              type="password"
              placeholder="Nova senha"
              icon={FiLock}
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirmação da senha"
              icon={FiLock}
            />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </S.AnimationContainer>
      </S.Content>
      <S.Background />
    </S.Container>
  );
};

export default ResetPassword;
