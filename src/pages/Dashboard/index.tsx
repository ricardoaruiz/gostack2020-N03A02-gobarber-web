import React, { useState, useCallback, useEffect, useMemo } from 'react';
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
  isToday,
  getHours,
  parseISO,
  isAfter,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logoImg from '../../assets/logo.svg';

import * as S from './styles';
import api from '../../services/api';
import Calendar from './Calendar';

interface CalendarCurrentDate {
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

interface Appointment {
  id: string;
  date: string;
  formattedHour: string;
  customer: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarCurrentDate, setCalendarCurrentDate] = useState<
    CalendarCurrentDate
  >(() => {
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
  });
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

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

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          day: getDate(currentDate),
          month: getMonth(currentDate) + 1,
          year: getYear(currentDate),
        },
      })
      .then(result => {
        const currentAppointments = result.data.map(item => ({
          ...item,
          formattedHour: format(parseISO(item.date), 'HH:mm', {
            locale: ptBR,
          }),
        }));
        setAppointments(currentAppointments);
      });
  }, [currentDate]);

  const currentDateAsText = useMemo(
    () =>
      format(currentDate, "'Dia' dd 'de' MMMM", {
        locale: ptBR,
      }),
    [currentDate],
  );

  const currentDateWeekDayAsText = useMemo(
    () => format(currentDate, 'cccc', { locale: ptBR }),
    [currentDate],
  );

  const morningAppointments = useMemo(
    () =>
      appointments.filter(
        appointment => getHours(parseISO(appointment.date)) < 12,
      ),
    [appointments],
  );

  const afternoonAppointments = useMemo(
    () =>
      appointments.filter(
        appointment => getHours(parseISO(appointment.date)) >= 12,
      ),
    [appointments],
  );

  const nextAppointment = useMemo(
    () =>
      appointments.find(appointment =>
        isAfter(parseISO(appointment.date), new Date())),
    [appointments],
  );

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <S.Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
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
            {isToday(currentDate) && <span>Hoje</span>}
            <span>{currentDateAsText}</span>
            <span>{currentDateWeekDayAsText}</span>
          </p>
          {isToday(currentDate) && nextAppointment && (
            <S.NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.customer.avatar_url}
                  alt={nextAppointment.customer.name}
                />
                <strong>{nextAppointment.customer.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.formattedHour}
                </span>
              </div>
            </S.NextAppointment>
          )}

          <S.Section>
            <strong>Manhã</strong>
            {!morningAppointments.length && <p>Não há agendamentos</p>}
            {morningAppointments.map(appointment => (
              <S.Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.customer.avatar_url}
                    alt={appointment.customer.name}
                  />
                  <p>{appointment.customer.name}</p>
                </div>
              </S.Appointment>
            ))}
          </S.Section>

          <S.Section>
            <strong>Tarde</strong>
            {!afternoonAppointments.length && <p>Não há agendamentos</p>}
            {afternoonAppointments.map(appointment => (
              <S.Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.customer.avatar_url}
                    alt={appointment.customer.name}
                  />
                  <p>{appointment.customer.name}</p>
                </div>
              </S.Appointment>
            ))}
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
