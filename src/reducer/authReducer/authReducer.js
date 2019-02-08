import decodeJwt from 'jwt-decode';

import { SOCIAL_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from '../../action/authActions/authActions';

const token = localStorage.getItem('userToken');

const initialAuthState = {
  isAuthenticated: Boolean(token),
  roleId: token ? decodeJwt(token).roleId : '',
  loginErrors: [],
  isLoading: false
};

const authReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case SOCIAL_LOGIN_SUCCESS:
      return { ...state, ...payload, loginErrors: [] };
    case USER_LOGIN_FAILURE:
      return { ...state, ...{ isAuthenticated: false, roleId: '', loginErrors: [payload] } };
    default:
      return state;
  }
};

export default authReducer;
