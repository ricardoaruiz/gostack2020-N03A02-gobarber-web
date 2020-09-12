import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth } from '../../hooks/useAuth';
import { AuthContextProvider } from '../../context/authContext';
import api from '../../services/api';

const mockedApi = new MockAdapter(api);

const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

describe('Auth hook', () => {
  beforeEach(() => {
    mockedApi.reset();
    setItemSpy.mockClear();
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
});
