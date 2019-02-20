/* eslint-disable no-constant-condition */
import makeRequest from '../../utils/axiosSetup';
import manageUserToken from '../../utils/auth/authentication';

export const UPDATE_STATUS_CODE = 'UPDATE_STATUS_CODE';

export const sendConfirmationMailApiCall = email => {
  return async dispatch => {
    try {
      await makeRequest(`/auth/resend-verification-link`, {
        method: 'POST',
        body: { email }
      });
      dispatch({ type: 'ON_EMAIL_SUBMIT' });
    } catch (error) {
      dispatch({ type: 'ON_EMAIL_SUBMIT' });
    }
  };
};

export const updateStatus = value => {
  return { type: UPDATE_STATUS_CODE, payload: value };
};

export const verifyUserApiCall = (token, history) => {
  return async () => {
    try {
      await makeRequest(`/auth/verify/${token}`, {
        method: 'POST'
      });
      manageUserToken.saveUserToken('userToken', token);
      history.push('/articles');
    } catch (error) {
      const {
        response: { data }
      } = error;
      const responseStatusCode = data.data.statusCode;
      if (responseStatusCode === 409) {
        manageUserToken.saveUserToken(token);
        history.push('/articles');
      } else {
        history.push('/resend-verification');
      }
    }
  };
};
