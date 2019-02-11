import { combineReducers } from 'redux';
import sendEmailReducer from './forgotPassword/forgotPasswordReducer';
import sendPasswordReducer from './forgotPassword/resetPasswordReducer';
import authReducer from './authReducer/authReducer';
import signUpReducer from './signUp/signUpReducer';

const reducers = combineReducers({
  sendEmailReducer,
  sendPasswordReducer,
  auth: authReducer,
  signUpReducer
});

export default reducers;
