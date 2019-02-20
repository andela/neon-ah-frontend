import authReducer from './authReducer';
import {
  SOCIAL_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  LOGIN_LOADING,
  LOGIN_USER_SUCCESS,
  CLEAR_LOGIN_ERRORS
} from '../../action/authActions/authActions';

describe('Auth Reducer', () => {
  const initialAuthState = {
    isAuthenticated: false,
    roleId: '',
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

  test('should resturn the expected state when LOGIN_LOADING action type is dispatched', () => {
    const action = {
      type: LOGIN_LOADING,
      payload: true
    };

    const expectedState = {
      isAuthenticated: false,
      roleId: '',
      loginErrors: [],
      isLoading: true
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });

  test('should resturn the expected state when LOGIN_USER_SUCCESS action type is dispatched', () => {
    const action = {
      type: LOGIN_USER_SUCCESS,
      payload: { isAuthenticated: true, roleId: '1234567890' }
    };

    const expectedState = {
      isAuthenticated: true,
      roleId: '1234567890',
      loginErrors: [],
      isLoading: false
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });

  test('should resturn the expected state when CLEAR_LOGIN_ERRORS action type is dispatched', () => {
    const action = {
      type: CLEAR_LOGIN_ERRORS
    };

    const expectedState = {
      isAuthenticated: false,
      roleId: '',
      loginErrors: [],
      isLoading: false
    };

    expect(authReducer(initialAuthState, action)).toEqual(expectedState);
  });
});
