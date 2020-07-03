import React, { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...otherProps }) => (
  <S.Container type="button" {...otherProps}>
    {children}
  </S.Container>
);

export default Button;
