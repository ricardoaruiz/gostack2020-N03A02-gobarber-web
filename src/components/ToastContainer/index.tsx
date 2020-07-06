import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import * as S from './styles';

const ToastContainer: React.FC = () => (
  <S.Container>
    <S.Toast>
      <FiAlertCircle size={20} />

      <span>Informação</span>
      <p>Você possui agendamentos pendentes!</p>

      <button type="button">
        <FiXCircle />
      </button>
    </S.Toast>

    <S.Toast type="success">
      <FiAlertCircle size={20} />

      <span>Sucesso</span>
      <p>
        Agendamento realizado com sucesso.
        <br />
        Verifique a lista de agendamentos.
      </p>

      <button type="button">
        <FiXCircle />
      </button>
    </S.Toast>

    <S.Toast type="error">
      <FiAlertCircle size={20} />

      <span>Erro</span>
      <p>
        Erro ao realizar um agendamento.
        <br /> Por favor tente mais tarde.
      </p>

      <button type="button">
        <FiXCircle />
      </button>
    </S.Toast>
  </S.Container>
);

export default ToastContainer;
