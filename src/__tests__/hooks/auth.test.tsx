import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth } from '../../hooks/useAuth';
import { AuthContextProvider } from '../../context/authContext';
import api from '../../services/api';

const mockedApi = new MockAdapter(api);

const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

describe('Auth hook', () => {
  beforeEach(() => {
    mockedApi.reset();
    setItemSpy.mockClear();
    getItemSpy.mockClear();
    removeItemSpy.mockClear();
  });

  it('should be able to signin', async () => {
    const signinResponse = {
      user: {
        id: 'user123',
        name: 'John Doe',
        email: 'johndoe@email.com',
      },
      token: 'token-123',
    };

    mockedApi.onPost('sessions').reply(200, signinResponse);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider,
    });

    result.current.signIn({
      email: 'johndoe@email.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      signinResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(signinResponse.user),
    );
    expect(result.current.user.email).toEqual('johndoe@email.com');
  });

  it('should restore saved data from storage when auth inits', async () => {
    const user = {
      id: 'user123',
      name: 'John Doe',
      email: 'johndoe@email.com',
    };
    getItemSpy.mockReturnValueOnce('token-123');
    getItemSpy.mockReturnValueOnce(JSON.stringify(user));

    getItemSpy.mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify(user);
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider,
    });

    expect(result.current.user.email).toEqual(user.email);
  });

  it('should be able to signout', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:token');
    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:user');
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to updateUser', () => {
    const user = {
      id: '123abc',
      name: 'John Doe',
      email: 'johndoe@email.com',
      avatar_url: 'http://avatar.com.br',
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider,
    });

    act(() => {
      result.current.updateUser(user);
    });

    expect(result.current.user).toEqual(expect.objectContaining(user));
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
  });
});
