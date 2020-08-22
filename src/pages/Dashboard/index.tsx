import React, { useState, useCallback, useEffect } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  getDay,
  getMonth,
  getYear,
  getDate,
  format,
  addDays,
  addMonths,
  isSunday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useAuth } from '../../hooks/useAuth';
import logoImg from '../../assets/logo.svg';

import * as S from './styles';
import api from '../../services/api';
import Calendar from './Calendar';

interface CurrentDate {
  date: Date;
  day: number;
  month: number;
  year: number;
  monthName: string;
  dayOfWeek: number;
}

interface MonthAvailability {
  day: number;
  dayOfWeek: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarCurrentDate, setCalendarCurrentDate] = useState<CurrentDate>(
    () => {
      const current = new Date();
      const tempMonthName = format(current, 'MMMM', { locale: ptBR });
      const monthName =
        tempMonthName.charAt(0).toUpperCase() + tempMonthName.slice(1);

      return {
        date: current,
        day: getDate(current),
        month: getMonth(current),
        year: getYear(current),
        monthName,
        dayOfWeek: getDay(current),
      };
    },
  );
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);

  const buildCurrentDate = useCallback((date: Date) => {
    const tempMonthName = format(date, 'MMMM', { locale: ptBR });
    const monthName =
      tempMonthName.charAt(0).toUpperCase() + tempMonthName.slice(1);

    setCalendarCurrentDate({
      date,
      day: getDate(date),
      month: getMonth(date),
      year: getYear(date),
      monthName,
      dayOfWeek: getDay(date),
    });
  }, []);

  const handleChangeDate = useCallback(
    (date: Date) => {
      setCurrentDate(date);
      buildCurrentDate(date);
    },
    [buildCurrentDate],
  );

  const handleChangeMonth = useCallback(
    (type: 'prev' | 'next') => {
      const now = new Date();
      const { date } = calendarCurrentDate;

      let newDate = addMonths(
        new Date(getYear(date), getMonth(date), 1),
        type === 'prev' ? -1 : 1,
      );

      while (!isSunday(newDate)) {
        newDate = addDays(newDate, 1);
      }
      const t1 = Number(`${getYear(newDate)}${getMonth(newDate)}`);
      const t2 = Number(`${getYear(now)}${getMonth(now)}`);

      if (t1 < t2) {
        return;
      }

      if (isLoading) {
        return;
      }

      setMonthAvailability([]);
      buildCurrentDate(
        getMonth(newDate) === getMonth(currentDate) ? currentDate : newDate,
      );
    },
    [buildCurrentDate, calendarCurrentDate, currentDate, isLoading],
  );

  useEffect(() => {
    const { id } = user;

    setIsLoading(true);
    api
      .get<MonthAvailability[]>(`/providers/${id}/month-availability`, {
        params: {
          month: calendarCurrentDate.month + 1,
          year: calendarCurrentDate.year,
        },
      })
      .then(result => {
        const availability = result.data.map(data => {
          const { day, available } = data;

          const dayOfWeek = getDay(
            new Date(calendarCurrentDate.year, calendarCurrentDate.month, day),
          );
          return {
            day: data.day,
            dayOfWeek,
            available,
          };
        });
        setMonthAvailability(availability);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [calendarCurrentDate.month, calendarCurrentDate.year, user]);

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

        <Calendar
          currentDate={calendarCurrentDate}
          monthAvailability={monthAvailability}
          handleChangeMonth={handleChangeMonth}
          handleChangeDate={handleChangeDate}
        />
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;
