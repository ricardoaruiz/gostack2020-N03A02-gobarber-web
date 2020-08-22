import React from 'react';
import { FiPower, FiClock } from 'react-icons/fi';

import { useAuth } from '../../hooks/useAuth';
import logoImg from '../../assets/logo.svg';

import * as S from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

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
        <S.Calendar>calendar</S.Calendar>
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;
