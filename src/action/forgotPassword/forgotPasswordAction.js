import makeRequest from '../../utils/axiosSetup';
// These are the action type constants.

// forgot password
export const ON_EMAIL_SUBMIT = 'ON_EMAIL_SUBMIT';

// reset password
export const ERROR_OR_SUCCESS = 'ERROR_OR_SUCCESS';

// action type
export const setMessage = (type, value) => {
  return { type: ERROR_OR_SUCCESS, payload: { type, value } };
};

export const onEmailSubmit = () => {
  return { type: ON_EMAIL_SUBMIT, payload: { error: '' } };
};

export const forgetPasswordRequest = email => {
  return async dispatch => {
    try {
      await makeRequest('/password/forgot', { method: 'POST', body: { email } });
      dispatch({ type: ON_EMAIL_SUBMIT });
    } catch (error) {
      dispatch({ type: ON_EMAIL_SUBMIT });
    }
  };
};

export const resetPassword = (newPassword, confirmPassword, token) => {
  return async dispatch => {
    try {
      const options = {
        method: 'POST',
        body: { newPassword, confirmPassword }
      };
      const { data: message } = await makeRequest(`/password/reset/${token}`, options);
      dispatch(setMessage('success', message));
    } catch (error) {
      const {
        data: {
          data: { message }
        }
      } = error.response;
      dispatch(setMessage('failure', message));
    }
  };
};
