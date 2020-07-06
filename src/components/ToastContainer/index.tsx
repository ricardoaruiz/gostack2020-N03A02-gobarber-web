import React from 'react';

import * as S from './styles';
import Toast, { ToastMessage } from './Toast';

interface ToastContainerProps {
  data: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  data,
}: ToastContainerProps) => (
    <S.Container>
      {data.length
        ? data.map(({ id, type, message }: ToastMessage) => (
          <Toast key={id} id={id} type={type} message={message} />
        ))
        : null}
    </S.Container>
  );

export default ToastContainer;
