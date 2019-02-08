import decodeJwt from 'jwt-decode';
import authReducer from './authReducer';
import { SOCIAL_LOGIN_SUCCESS, USER_LOGIN_FAILURE, LOGIN_LOADING } from '../../action/authActions/authActions';

describe('Auth Reducer', () => {
  const token = localStorage.getItem('userToken');

  const initialAuthState = {
    isAuthenticated: Boolean(token),
    roleId: token ? decodeJwt(token).roleId : '',
    loginErrors: [],
    isLoading: false
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'DUMMYACTION' })).toEqual(initialAuthState);
  });

  it('should return a new state for successfull social login', () => {
    const action = { type: SOCIAL_LOGIN_SUCCESS, payload: { isAuthenticated: true, roleId: 1234 } };

    const expectedState = {
      isAuthenticated: true,
      roleId: 1234,
      loginErrors: [],
      isLoading: false
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });

  it('should return a new state for failed social login', () => {
    const action = {
      type: USER_LOGIN_FAILURE,
      payload: ['Login Error']
    };

    const expectedState = {
      isAuthenticated: false,
      roleId: '',
      loginErrors: [...action.payload],
      isLoading: false
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });
});
