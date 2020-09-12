import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  InputHTMLAttributes,
} from 'react';
import classnames from 'classnames';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...otherProps }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const classes = classnames({
    focused: isFocused,
    filled: isFilled,
    error: !!error,
  });

  return (
    <S.Container className={classes} data-testid="input-container">
      {Icon && <Icon size={20} className="icon" data-testid="input-icon" />}
      <input
        {...otherProps}
        ref={inputRef}
        defaultValue={defaultValue}
        autoComplete="off"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {error && (
        <S.Error title={error} type="error">
          <FiAlertCircle size={20} />
        </S.Error>
      )}
    </S.Container>
  );
};

export default Input;
