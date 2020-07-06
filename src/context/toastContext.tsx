import React, { createContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';
import { ToastMessage } from '../components/ToastContainer/Toast';

type Toast = Omit<ToastMessage, 'id'>;

export interface ToastContextData {
  addToast: (data: Toast) => void;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData,
);

export const ToastContextProvider: React.FC = ({ children }) => {
  const [toastsData, setToastsData] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ type, message }: Toast) => {
    setToastsData(state => [
      ...state,
      {
        id: uuid(),
        type,
        message,
      },
    ]);
  }, []);

  const removeToast = useCallback((id: string): void => {
    setToastsData(state => state.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToastsData([]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, removeAllToasts }}>
      {children}
      <ToastContainer data={toastsData} />
    </ToastContext.Provider>
  );
};
