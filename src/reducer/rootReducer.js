import { combineReducers } from 'redux';
import sendEmailReducer from './forgotPassword/forgotPasswordReducer';
import sendPasswordReducer from './forgotPassword/resetPasswordReducer';
import authReducer from './authReducer/authReducer';
import signUpReducer from './signUp/signUpReducer';
import accountVerifyReducer from './verifyAccount/verifyAccountReducer';
import searchFunctionalityReducer from './searchFunctionality/searchFunctionalityReducer';

const reducers = combineReducers({
  sendEmailReducer,
  sendPasswordReducer,
  auth: authReducer,
  signUpReducer,
  accountVerifyReducer,
  searchFunctionalityReducer
});

export default reducers;
