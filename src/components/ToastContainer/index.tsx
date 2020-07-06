import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { useToast } from '../../hooks/useToast';

import * as S from './styles';

export interface Toast {
  id?: string;
  type?: 'info' | 'success' | 'error';
  message?: string;
}

interface ToastContainerProps {
  data: Toast[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  data,
}: ToastContainerProps) => {
  const toastType = {
    info: 'Informação',
    success: 'Sucesso',
    error: 'Erro',
  };

  const { closeToast } = useToast();

  return (
    <S.Container>
      {data.length
        ? data.map((toast: Toast) => (
          <S.Toast key={toast.id} type={toast.type}>
            <FiAlertCircle size={20} />

            <span>{toastType[toast?.type || 'info']}</span>
            <p>{toast.message}</p>

            <button type="button" onClick={() => closeToast(toast.id)}>
              <FiXCircle />
            </button>
          </S.Toast>
        ))
        : null}
    </S.Container>
  );
};

export default ToastContainer;
