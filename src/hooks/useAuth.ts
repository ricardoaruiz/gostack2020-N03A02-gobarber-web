import { useContext } from 'react';
import { AuthContext, AuthContextData } from '../context/authContext';

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('You cannot use useAuth without using AuthProvider');
  }

  return context;
};
