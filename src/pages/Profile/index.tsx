import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiLock, FiMail, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/useToast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/useAuth';
import * as S from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  // Submit do form
  const handleFormSubmit: SubmitHandler<ProfileFormData> = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          email: Yup.string()
            .email('E-mail inválido')
            .required('Campo obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: value => !!value,
            then: Yup.string().required('campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: value => !!value,
              then: Yup.string().required('campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'não confere com a senha'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formDataPassword = {
          old_password,
          password,
          password_confirmation,
        };

        const formData = {
          name,
          email,
          ...(old_password ? { ...formDataPassword } : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          message: 'Perfil do usuário alterado com sucesso.',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(err);
          formRef.current?.setErrors(validationErrors);
          return;
        }
        addToast({
          type: 'error',
          message: err.response ? err.response.data.message : err.message,
        });
      }
    },
    [addToast, history, updateUser],
  );

  // Change avatar
  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const formData = new FormData();
        formData.append('avatar', event.target.files[0]);
        api
          .patch('/users/avatar', formData)
          .then(response => {
            updateUser(response.data);
            addToast({
              type: 'success',
              message: 'Avatar atualizado com sucesso.',
            });
          })
          .catch(error => {
            console.error('Erro ao atualizar o avatar', error);
          });
      }
    },
    [addToast, updateUser],
  );

  return (
    <S.Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <S.Content>
        <Form
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleFormSubmit}
          ref={formRef}
        >
          <S.AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </S.AvatarInput>

          <h1>Meu Perfil</h1>

          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="email" placeholder="E-mail" icon={FiMail} />
          <Input
            name="old_password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Input
            name="password"
            type="password"
            placeholder="Nova senha"
            icon={FiLock}
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirmar senha"
            icon={FiLock}
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </S.Content>
    </S.Container>
  );
};

export default Profile;
