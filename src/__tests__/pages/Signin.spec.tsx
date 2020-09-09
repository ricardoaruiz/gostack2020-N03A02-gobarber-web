import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/Signin';

// Mock do router
const mockedHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock do sigin
const mockedSigIn = jest.fn();
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    signIn: mockedSigIn,
  }),
}));

// Mock do toast
const mockedAddToast = jest.fn();
jest.mock('../../hooks/useToast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

// Deu esse erro => TypeError: MutationObserver is not a constructor
// https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedSigIn.mockClear();
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });
  it('should not be able to signin with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
  it('should be able to display an error if login fail', async () => {
    mockedSigIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@email.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
