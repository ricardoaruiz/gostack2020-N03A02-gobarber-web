import React from 'react';
import { useTransition } from 'react-spring';

import * as S from './styles';
import Toast, { ToastMessage } from './Toast';

interface ToastContainerProps {
  data: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  data,
}: ToastContainerProps) => {
  const animatedToasts = useTransition(data, toast => toast.id, {
    from: {
      right: '-120%',
      opacity: 0,
    },
    enter: {
      right: '0%',
      opacity: 1,
    },
    leave: {
      right: '-120%',
      opacity: 0,
    },
  });
  return (
    <S.Container>
      {animatedToasts.map(({ key, item, props }) => (
        <Toast key={key} data={item} style={props} />
      ))}
    </S.Container>
  );
};

export default ToastContainer;
