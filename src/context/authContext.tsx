import React, { createContext, useCallback, useState } from 'react';

import api from '../services/api';

const LocalStorageTokenKey = '@GoBarber:token';
const LocalStorageUserKey = '@GoBarber:user';
interface SignInCredentials {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface AuthContextData {
  user: IUser;
  signIn: (data: SignInCredentials) => void;
  signOut: () => void;
  updateUser: (updateUser: IUser) => void;
}

interface AuthStateData {
  token: string;
  user: IUser;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);
AuthContext.displayName = 'AuthContext';

export const AuthContextProvider: React.FC = ({ children }) => {
  // Cria estado com token e usuário logado buscando do local storage
  // caso não exista cria estado vazio
  const [authData, setAuthData] = useState<AuthStateData>(() => {
    const token = localStorage.getItem(LocalStorageTokenKey);
    const user = localStorage.getItem(LocalStorageUserKey);

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthStateData;
  });

  /**
   * Faz o login na aplicação.
   * Recebe os dados informados pelo usuário na tela de login e chama
   * a api, em seguida atualiza o localStorage com as informações do login
   * e atualiza os dados do contexto de autenticação
   */
  const signIn = useCallback(
    ({ email, password }: SignInCredentials) =>
      api
        .post('/sessions', { email, password })
        .then(response => {
          const { token, user } = response.data;
          localStorage.setItem(LocalStorageTokenKey, token);
          localStorage.setItem(LocalStorageUserKey, JSON.stringify(user));
          setAuthData({ token, user });
        })
        .catch(error => {
          if (error.response.status === 401) {
            throw new Error('Usuário ou senha inválidos');
          }
          throw error;
        }),
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(LocalStorageTokenKey);
    localStorage.removeItem(LocalStorageUserKey);
    setAuthData({} as AuthStateData);
  }, []);

  const updateUser = useCallback(
    (updateData: IUser) => {
      setAuthData({
        token: authData.token,
        user: updateData,
      });
      localStorage.setItem(LocalStorageUserKey, JSON.stringify(updateData));
    },
    [authData.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
