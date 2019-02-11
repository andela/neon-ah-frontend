import { signUpActionTypes } from '../../action/signUp/signUpAction';

const INITIAL_STATE = {
  isLoading: false,
  signUpCompleted: false,
  hasSignUpError: false,
  signUpError: null,
  message: null
};

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case signUpActionTypes.SIGNUP_USER:
      return {
        ...state,
        ...action.payload
      };
    case signUpActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case signUpActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
