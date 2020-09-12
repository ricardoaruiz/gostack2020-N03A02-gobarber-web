import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FiArrowLeft } from 'react-icons/fi';
import Input from '../../components/Input';

const mockedUseField = jest.fn().mockImplementation(() => ({
  fieldName: 'email',
  defaultValue: '',
  error: '',
  registerField: jest.fn(),
}));

jest.mock('@unform/core', () => ({
  useField: () => mockedUseField(),
}));

describe('Input component', () => {
  beforeEach(() => {
    mockedUseField.mockClear();
  });

  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should renders highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    const containerElement = getByTestId('input-container');
    const inputElement = getByPlaceholderText('E-mail');

    fireEvent.focus(inputElement);
    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
    });

    fireEvent.blur(inputElement);
    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000');
    });
  });

  it('should keep highlight on input blur when is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    const containerElement = getByTestId('input-container');
    const inputElement = getByPlaceholderText('E-mail');

    fireEvent.focus(inputElement);
    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
    });

    fireEvent.change(inputElement, { target: { value: 'johndoe@email.com' } });
    fireEvent.blur(inputElement);
    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });

  it('should render error when the field has an error', async () => {
    mockedUseField.mockImplementation(() => ({
      fieldName: 'email',
      defaultValue: '',
      error: 'E-mail inválido',
      registerField: jest.fn(),
    }));
    const { getByTestId } = render(<Input name="email" placeholder="E-mail" />);
    const containerElement = getByTestId('input-container');

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #c53030');
    });
  });

  it('should render an input with icon', async () => {
    const { getByTestId } = render(
      <Input name="email" placeholder="E-mail" icon={FiArrowLeft} />,
    );
    const inputIcon = getByTestId('input-icon');

    await waitFor(() => {
      expect(inputIcon).toBeInTheDocument();
    });
  });
});
