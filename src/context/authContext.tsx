import React, { useCallback, useState, useContext, createContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn: (data: SignInCredentials) => void;
}

interface AuthStateData {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
AuthContext.displayName = 'AuthContext';

const LocalStorageTokenKey = '@GoBarber:token';
const LocalStorageUserKey = '@GoBarber:user';

const AuthContextProvider: React.FC = ({ children }) => {
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
  const signIn = useCallback(({ email, password }: SignInCredentials) => {
    api.post('/sessions', { email, password }).then(response => {
      const { token, user } = response.data;
      localStorage.setItem(LocalStorageTokenKey, token);
      localStorage.setItem(LocalStorageUserKey, JSON.stringify(user));
      setAuthData({ token, user });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: authData.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('You cannot use useAuth without using AuthProvider');
  }

  return context;
};

export { AuthContextProvider, useAuth };
