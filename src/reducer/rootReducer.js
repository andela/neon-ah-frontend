import { combineReducers } from 'redux';
import sendEmailReducer from './forgotPassword/forgotPassword.reducer';
import sendPasswordReducer from './forgotPassword/resetPassword.reducer';

const reducers = combineReducers({
  sendEmailReducer,
  sendPasswordReducer
});

export default reducers;
