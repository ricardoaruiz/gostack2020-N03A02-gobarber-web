import React from 'react';
import classnames from 'classnames';

import * as S from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  type?: 'error' | 'info';
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  type = 'info',
  children = null,
}: TooltipProps) => {
  const classes = classnames(className, {
    info: type === 'info',
    error: type === 'error',
  });
  return (
    <S.Container className={classes}>
      {children}
      <span>{title}</span>
    </S.Container>
  );
};

export default Tooltip;
