import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...otherProps }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <S.Container>
      {Icon && <Icon size={20} />}
      <input
        {...otherProps}
        ref={inputRef}
        defaultValue={defaultValue}
        autoComplete="off"
      />
    </S.Container>
  );
};

export default Input;
