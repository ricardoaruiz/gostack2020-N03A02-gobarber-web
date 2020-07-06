import React from 'react';
import { AuthContextProvider } from './authContext';
import { ToastContextProvider } from './toastContext';

const AppContextProvider: React.FC = ({ children }) => (
  <AuthContextProvider>
    <ToastContextProvider>{children}</ToastContextProvider>
  </AuthContextProvider>
);

export default AppContextProvider;
