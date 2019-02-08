import { combineReducers } from 'redux';
import sendEmailReducer from './forgotPassword/forgotPasswordReducer';
import sendPasswordReducer from './forgotPassword/resetPasswordReducer';
import authReducer from './authReducer/authReducer';

const reducers = combineReducers({
  sendEmailReducer,
  sendPasswordReducer,
  auth: authReducer
});

export default reducers;
