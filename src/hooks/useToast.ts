import { useContext } from 'react';
import { ToastContext, ToastContextData } from '../context/toastContext';

export const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Use toast can not be used without ToastProvider');
  }

  return context;
};
