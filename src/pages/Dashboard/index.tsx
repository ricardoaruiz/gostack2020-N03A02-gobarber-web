import React, { useState, useCallback, useEffect } from 'react';
import { FiPower, FiClock, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import {
  getDay,
  getMonth,
  getYear,
  getDate,
  format,
  addMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useAuth } from '../../hooks/useAuth';
import logoImg from '../../assets/logo.svg';

import * as S from './styles';
import api from '../../services/api';

interface CurrentDate {
  date: Date;
  year: number;
  month: number;
  monthName: string;
  dayOfMonth: number;
  dayOfWeek: number;
}

interface DayInMonth {
  day: number;
  dayOfWeek: number;
  available?: boolean;
}

const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState<CurrentDate>(() => {
    const current = new Date();
    const tempMonthName = format(current, 'MMMM', { locale: ptBR });
    const monthName = tempMonthName.charAt(0).toUpperCase() + tempMonthName.slice(1);
    return {
      date: current,
      year: getYear(current),
      month: getMonth(current),
      monthName,
      dayOfMonth: getDate(current),
      dayOfWeek: getDay(current),
    };
  });
  const [daysInMonth, setDaysInMont] = useState<DayInMonth[]>([]);

  const isDayAvailable = useCallback(
    (dayInMonth: DayInMonth) =>
      dayInMonth.dayOfWeek > 0 &&
      dayInMonth.dayOfWeek < 6 &&
      dayInMonth.available,
    [],
  );

  const buildCurrentDate = useCallback((date: Date) => {
    const tempMonthName = format(date, 'MMMM', { locale: ptBR });
    const monthName = tempMonthName.charAt(0).toUpperCase() + tempMonthName.slice(1);
    setCurrentDate({
      date,
      year: getYear(date),
      month: getMonth(date),
      monthName,
      dayOfMonth: getDate(date),
      dayOfWeek: getDay(date),
    });
  }, []);

  const handleChangeDate = useCallback(
    (dayInMonth: DayInMonth) => {
      const { day } = dayInMonth;
      if (isDayAvailable(dayInMonth)) {
        const { year, month } = currentDate;
        buildCurrentDate(new Date(year, month, day));
      }
    },
    [buildCurrentDate, currentDate, isDayAvailable],
  );

  const handleChangeMonth = useCallback(
    (type: 'prev' | 'next') => {
      const now = new Date();
      const { date } = currentDate;
      const newDate = addMonths(date, type === 'prev' ? -1 : 1);
      const t1 = Number(`${getYear(newDate)}${getMonth(newDate)}`);
      const t2 = Number(`${getYear(now)}${getMonth(now)}`);

      if (isLoading) {
        return;
      }

      if (t1 < t2) {
        return;
      }

      setDaysInMont([]);
      buildCurrentDate(newDate);
    },
    [buildCurrentDate, currentDate, isLoading],
  );

  useEffect(() => {
    const { month, year } = currentDate;
    const { id } = user;

    setIsLoading(true);
    api
      .get<DayInMonth[]>(
        `/providers/${id}/month-availability?month=${month + 1}&year=${year}`,
      )
      .then(result => {
        const monthAvailability = result.data.map(data => {
          const { day, available } = data;

          const dayOfWeek = getDay(
            new Date(
              getYear(currentDate.date),
              getMonth(currentDate.date),
              day,
            ),
          );
          return {
            day: data.day,
            dayOfWeek,
            available,
          };
        });
        setDaysInMont(monthAvailability);
      })
      .finally(() => setIsLoading(false));
  }, [currentDate, user]);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <S.Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo</span>
              <strong>{user.name}</strong>
            </div>
          </S.Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </S.HeaderContent>
      </S.Header>
      <S.Content>
        <S.Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 21</span>
            <span>Sexta-feira</span>
          </p>
          <S.NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/8824363?s=460&u=1dab04b6df0098023ea8ac47c9946d606e6231d0&v=4"
                alt="sss"
              />
              <strong>Ricardo Almendro Ruiz</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </S.NextAppointment>

          <S.Section>
            <strong>Manhã</strong>
            <S.Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/8824363?s=460&u=1dab04b6df0098023ea8ac47c9946d606e6231d0&v=4"
                  alt="sss"
                />
                <p>Ricardo Ruiz</p>
              </div>
            </S.Appointment>
            <S.Appointment>
              <span>
                <FiClock />
                10:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/8824363?s=460&u=1dab04b6df0098023ea8ac47c9946d606e6231d0&v=4"
                  alt="sss"
                />
                <p>Ricardo Ruiz</p>
              </div>
            </S.Appointment>
          </S.Section>

          <S.Section>
            <strong>Tarde</strong>
            <S.Appointment>
              <span>
                <FiClock />
                13:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/8824363?s=460&u=1dab04b6df0098023ea8ac47c9946d606e6231d0&v=4"
                  alt="sss"
                />
                <p>Ricardo Ruiz</p>
              </div>
            </S.Appointment>
            <S.Appointment>
              <span>
                <FiClock />
                15:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/8824363?s=460&u=1dab04b6df0098023ea8ac47c9946d606e6231d0&v=4"
                  alt="sss"
                />
                <strong>Ricardo Ruiz</strong>
              </div>
            </S.Appointment>
          </S.Section>
        </S.Schedule>

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
            {daysInMonth.length && (
              <S.CalendarMonthDays>
                {daysInMonth[0].dayOfWeek !== 0 &&
                  Array.from({ length: daysInMonth[0].dayOfWeek }, (_, i) => (
                    <S.MonthDay off key={i} />
                  ))}
                {daysInMonth.map(dayInMonth => (
                  <S.MonthDay
                    key={dayInMonth.day}
                    active={currentDate.dayOfMonth === dayInMonth.day}
                    off={!isDayAvailable(dayInMonth)}
                    onClick={() => handleChangeDate(dayInMonth)}
                  >
                    {dayInMonth.day}
                  </S.MonthDay>
                ))}
              </S.CalendarMonthDays>
            )}
          </S.CalendarContent>
        </S.Calendar>
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;
