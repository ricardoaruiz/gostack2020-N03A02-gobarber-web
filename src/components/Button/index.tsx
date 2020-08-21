import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...otherProps
}) => (
    <S.Container type="button" {...otherProps}>
      {loading ? 'Carregando...' : children}
    </S.Container>
  );

export default Button;
