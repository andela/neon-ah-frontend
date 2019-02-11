import keyMirror from 'keymirror';
import makeRequest from '../../utils/axiosSetup';

const signUpActionTypes = keyMirror({
  SIGNUP_USER: null,
  SIGNUP_SUCCESS: null,
  SIGNUP_ERROR: null
});

const startUserSignUp = () => {
  return {
    type: signUpActionTypes.SIGNUP_USER,
    payload: {
      isLoading: true
    }
  };
};

const signUpFailure = error => {
  return {
    type: signUpActionTypes.SIGNUP_ERROR,
    payload: {
      isLoading: false,
      signUpCompleted: true,
      hasSignUpError: true,
      message: null,
      signUpError: error.message
    }
  };
};

const signUpSuccessful = response => {
  return {
    type: signUpActionTypes.SIGNUP_SUCCESS,
    payload: {
      isLoading: false,
      signUpCompleted: true,
      hasSignUpError: false,
      message: response.data.message,
      signUpError: null
    }
  };
};

const SignUpAction = {
  signUpUser: signUpData => async dispatch => {
    dispatch(startUserSignUp());
    try {
      const res = await makeRequest('/auth/signup', { method: 'POST', body: signUpData });
      dispatch(signUpSuccessful(res));
    } catch (error) {
      const errorObject = JSON.parse(JSON.stringify(error));
      const { response } = errorObject;
      if (response) {
        dispatch(signUpFailure(response.data.data));
        return;
      }
      dispatch(signUpFailure(error));
    }
  }
};

export { signUpActionTypes, SignUpAction, signUpSuccessful, signUpFailure, startUserSignUp };
