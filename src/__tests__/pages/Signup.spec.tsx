import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

import SignUp from '../../pages/Signup';

const mockedApi = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const mockedAddToast = jest.fn();
jest.mock('../../hooks/useToast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('Signup', () => {
  beforeEach(() => {
    mockedApi.reset();
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to render successfully', () => {
    const { container } = render(<SignUp />);
    expect(container).toBeInTheDocument();
  });

  it('should not be able to signup with backend error', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const signupButton = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'john doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@email.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(signupButton);

    mockedApi.onPost().networkError();

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should not be able to signup with invalid name', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);
    const nameField = getByPlaceholderText('Nome');
    const signupButton = getByText('Cadastrar');
    fireEvent.change(nameField, { target: { value: '' } });
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should be able to signup', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const signupButton = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'john doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@email.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(signupButton);

    mockedApi.onPost().reply(200);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          message: 'Usuário cadastrado com sucesso',
        }),
      );
    });
  });
});
