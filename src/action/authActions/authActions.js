import decodeJwt from 'jwt-decode';
import makeRequest from '../../utils/axiosSetup';

export const SOCIAL_LOGIN_SUCCESS = 'SOCIAL_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

export const loginError = message => {
  localStorage.removeItem('userToken');
  return { type: USER_LOGIN_FAILURE, payload: message };
};

export const clearLoginErrors = () => ({ type: CLEAR_LOGIN_ERRORS });

export const loginSocial = (history, token) => dispatch => {
  try {
    const userInfo = decodeJwt(token);

    localStorage.setItem('userToken', token);

    dispatch({ type: SOCIAL_LOGIN_SUCCESS, payload: { isAuthenticated: true, roleId: userInfo.roleId } });

    history.push('/articles');
  } catch (error) {
    dispatch(loginError('Cannot authenticate your account.'));
    history.push('/');
  }
};

export const loginLocal = ({ userEmailOrUsername, userPassword }, history) => async dispatch => {
  try {
    const {
      data: { token }
    } = await makeRequest('/auth/login', {
      method: 'POST',
      body: {
        user: userEmailOrUsername,
        password: userPassword
      }
    });

    localStorage.setItem('userToken', token);

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: { isAuthenticated: true, roleId: decodeJwt(token).roleId }
    });

    return history.push('/articles');
  } catch (errors) {
    const wrongDetails = 'Invalid username/Email or Password';
    switch (errors.response.status) {
      case 422:
        return dispatch(loginError(errors.response.data.data.error));
      case 404:
        return dispatch(loginError([wrongDetails]));
      case 401:
        return dispatch(loginError(['Your account has not been verified']));
      default:
        break;
    }
  }
};
