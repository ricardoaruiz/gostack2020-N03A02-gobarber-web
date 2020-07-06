import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/useToast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import * as S from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const handleFormSubmit: SubmitHandler<SignUpFormData> = useCallback(
    async data => {
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

        await api.post('/users', { ...data });

        addToast({
          type: 'success',
          message: 'Usuário cadastrado com sucesso',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(err);
          formRef.current?.setErrors(validationErrors);
          return;
        }
        addToast({ type: 'error', message: err.message });
      }
    },
    [addToast, history],
  );

  return (
    <S.Container>
      <S.Background />
      <S.Content>
        <S.AnimatedContainer>
          <img src={logo} alt="GoBarber" />

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
        </S.AnimatedContainer>
      </S.Content>
    </S.Container>
  );
};

export default SignUp;
