import React, { useState, useCallback, useEffect } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
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
import Calendar from './Calendar';

interface CurrentDate {
  date: Date;
  year: number;
  month: number;
  monthName: string;
  dayOfMonth: number;
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
  const [currentDate, setCurrentDate] = useState<CurrentDate>(() => {
    const current = new Date();
    const tempMonthName = format(current, 'MMMM', { locale: ptBR });
    const monthName =
      tempMonthName.charAt(0).toUpperCase() + tempMonthName.slice(1);

    return {
      date: current,
      year: getYear(current),
      month: getMonth(current),
      monthName,
      dayOfMonth: getDate(current),
      dayOfWeek: getDay(current),
    };
  });
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);

  const isDayAvailable = useCallback(
    (dayInMonth: MonthAvailability) =>
      dayInMonth.dayOfWeek > 0 &&
      dayInMonth.dayOfWeek < 6 &&
      dayInMonth.available,
    [],
  );

  const buildCurrentDate = useCallback((date: Date) => {
    const tempMonthName = format(date, 'MMMM', { locale: ptBR });
    const monthName =
      tempMonthName.charAt(0).toUpperCase() + tempMonthName.slice(1);

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
    (dayInMonth: MonthAvailability) => {
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

      setMonthAvailability([]);
      buildCurrentDate(newDate);
    },
    [buildCurrentDate, currentDate, isLoading],
  );

  useEffect(() => {
    const { month, year } = currentDate;
    const { id } = user;

    setIsLoading(true);
    api
      .get<MonthAvailability[]>(`/providers/${id}/month-availability`, {
        params: {
          month: month + 1,
          year,
        },
      })
      .then(result => {
        const availability = result.data.map(data => {
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
        setMonthAvailability(availability);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
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

        <Calendar
          currentDate={currentDate}
          monthAvailability={monthAvailability}
          handleChangeMonth={handleChangeMonth}
          handleChangeDate={handleChangeDate}
        />
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;
