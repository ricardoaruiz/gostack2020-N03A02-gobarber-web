import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import ResetPassword from '../../pages/ResetPassword';

const mockedHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: jest.fn(),
  }),
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
}));

const mockedAddToast = jest.fn();
jest.mock('../../hooks/useToast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('ResetPassword', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to render successfully', () => {
    const { container } = render(<ResetPassword />);
    expect(container).toBeInTheDocument();
  });

  it('should not be able to reset password invalid token', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/reset-password']}>
        <ResetPassword />
      </MemoryRouter>,
    );
    const btnChangePassword = getByText('Alterar senha');

    fireEvent.click(btnChangePassword);

    expect(mockedAddToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        message:
          'Token de troca de senha não identificado. Solicite um novo e-mail para a troca de senha',
      }),
    );
  });

  // fit('should not be able to reset password for password field not informed', () => {
  //   const { getByText } = render(
  //     <MemoryRouter initialEntries={['/reset-password?token=abcdef']}>
  //       <ResetPassword />
  //     </MemoryRouter>,
  //   );
  //   const btnChangePassword = getByText('Alterar senha');

  //   fireEvent.click(btnChangePassword);

  //   expect(mockedAddToast).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       type: 'error',
  //       message:
  //         'Token de troca de senha não identificado. Solicite um novo e-mail para a troca de senha',
  //     }),
  //   );
  // });
});
