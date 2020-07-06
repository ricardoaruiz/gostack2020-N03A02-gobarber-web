import React, { createContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer, { Toast } from '../components/ToastContainer';

export interface ToastContextData {
  showToast: (data: Toast | Toast[]) => void;
  closeToast: (id: string | undefined) => void;
  closeAllToasts: () => void;
}

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData,
);

export const ToastContextProvider: React.FC = ({ children }) => {
  const [toastsData, setToastsData] = useState<Toast[]>([]);

  const showToast = useCallback((toasts: Toast | Toast[]) => {
    if (toasts instanceof Array) {
      setToastsData(toasts.map(toast => ({ ...toast, id: uuid() })));
    } else {
      setToastsData([{ ...toasts, id: uuid() }]);
    }
  }, []);

  const closeToast = useCallback(
    (id: string | undefined): void => {
      if (!id) return;
      const closedToastIndex = toastsData.findIndex(toast => toast.id === id);
      if (closedToastIndex > -1) {
        const newToastsData = [...toastsData];
        newToastsData.splice(closedToastIndex, 1);
        setToastsData(newToastsData);
      }
    },
    [toastsData],
  );

  const closeAllToasts = useCallback(() => {
    setToastsData([]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, closeToast, closeAllToasts }}>
      {children}
      <ToastContainer data={toastsData} />
    </ToastContext.Provider>
  );
};
