import React, { useCallback } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { isToday } from 'date-fns';

import * as S from './styles';

interface CurrentDate {
  date: Date;
  day: number;
  year: number;
  month: number;
  monthName: string;
  dayOfWeek: number;
}

interface MonthAvailability {
  day: number;
  dayOfWeek: number;
  available: boolean;
}

interface CalendarProps {
  currentDate: CurrentDate;
  monthAvailability: MonthAvailability[];
  handleChangeMonth: (type: 'prev' | 'next') => void;
  handleChangeDate: (date: Date) => void;
}

const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  monthAvailability,
  handleChangeMonth,
  handleChangeDate,
}) => {
  const isDayAvailable = useCallback(
    (dayInMonth: MonthAvailability) =>
      dayInMonth.dayOfWeek > 0 &&
      dayInMonth.dayOfWeek < 6 &&
      dayInMonth.available,
    [],
  );

  const handleClickDay = useCallback(
    (dayInMonth: MonthAvailability) => {
      const { year, month } = currentDate;
      const { day } = dayInMonth;

      if (isDayAvailable(dayInMonth)) {
        handleChangeDate(new Date(year, month, day));
      }
    },
    [currentDate, handleChangeDate, isDayAvailable],
  );

  return (
    <S.Calendar>
      <S.CalendarHeader>
        <FiArrowLeft onClick={() => handleChangeMonth('prev')} />
        <strong>
          {currentDate.monthName} {currentDate.year}
        </strong>
        <FiArrowRight onClick={() => handleChangeMonth('next')} />
      </S.CalendarHeader>
      <S.CalendarContent>
        <S.CalendarWeekDays>
          {Array.from({ length: 7 }, (_, k) => (
            <S.WeekDay key={k} active={currentDate.dayOfWeek === k}>
              {daysOfWeek[k]}
            </S.WeekDay>
          ))}
        </S.CalendarWeekDays>
        {!!monthAvailability.length && (
          <S.CalendarMonthDays>
            {monthAvailability[0].dayOfWeek !== 0 &&
              Array.from({ length: monthAvailability[0].dayOfWeek }, (_, i) => (
                <S.MonthDay disabled key={i} />
              ))}
            {monthAvailability.map(dayInMonth => (
              <S.MonthDay
                key={dayInMonth.day}
                active={currentDate.day === dayInMonth.day}
                isToday={isToday(
                  new Date(currentDate.year, currentDate.month, dayInMonth.day),
                )}
                disabled={!isDayAvailable(dayInMonth)}
                onClick={() => handleClickDay(dayInMonth)}
              >
                <div>{dayInMonth.day}</div>
              </S.MonthDay>
            ))}
          </S.CalendarMonthDays>
        )}
      </S.CalendarContent>
    </S.Calendar>
  );
};

export default Calendar;
