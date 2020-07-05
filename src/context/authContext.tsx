import React, { useCallback, createContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn: (data: SignInCredentials) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthContextProvider: React.FC = ({ children }) => {
  const signIn = useCallback(({ email, password }: SignInCredentials) => {
    api
      .post('/sessions', { email, password })
      .then(response => console.log(response.data));
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Ricardo', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
