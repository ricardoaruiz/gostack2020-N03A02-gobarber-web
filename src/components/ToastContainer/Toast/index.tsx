import React, { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

import { useToast } from '../../../hooks/useToast';
import * as S from './styles';

export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  message?: string;
}

const Toast: React.FC<ToastMessage> = ({
  id,
  type = 'info',
  message = '',
}: ToastMessage) => {
  const { removeToast } = useToast();
  const toastType = {
    info: 'Informação',
    success: 'Sucesso',
    error: 'Erro',
  };

  const icon = {
    info: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />,
    error: <FiXCircle size={24} />,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, id]);

  return (
    <S.Container key={id} type={type}>
      {icon[type]}
      <span>{toastType[type]}</span>
      <p>{message}</p>
      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle />
      </button>
    </S.Container>
  );
};

export default Toast;
