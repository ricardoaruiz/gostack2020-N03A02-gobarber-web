import styled, { css } from 'styled-components';

export const Calendar = styled.aside`
  width: 24rem;
  height: 24rem;
  background: #28262e;
  border-radius: 10px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 3.125rem;
  background: #3e3b47;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  svg {
    width: 1.225rem;
    height: 1.225rem;
    color: #999591;
    cursor: pointer;

    &:hover {
      color: #ff9000;
    }
  }

  strong {
    color: #f4ede8;
  }
`;

export const CalendarContent = styled.div`
  padding: 0 2rem;
`;

export const CalendarWeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 0.5rem;
`;

interface WeekDayProps {
  active?: boolean;
}

export const WeekDay = styled.div<WeekDayProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;

  color: ${props => (!props.active ? '#666360' : '#FF9000')};
`;

export const CalendarMonthDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  margin-top: 0.5rem;
`;

interface MonthDayProps {
  disabled?: boolean;
  active?: boolean;
}

export const MonthDay = styled.div<MonthDayProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;

  ${props => {
    if (props.disabled) {
      return css`
        background: 'transparent';
        color: #666360;
        cursor: default;
      `;
    }
    return props.active
      ? css`
          background: #ff9000;
          color: #232129;
        `
      : css`
          background: #666360;
          &:hover {
            background: #ff9000;
            color: #232129;
          }
        `;
  }};
`;
