import decodeJwt from 'jwt-decode';

export const SOCIAL_LOGIN_SUCCESS = 'SOCIAL_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const LOGIN_LOADING = 'LOGIN_LOADING';

export const loginError = message => {
  localStorage.removeItem('userToken');
  return { type: USER_LOGIN_FAILURE, payload: message };
};

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
