import { combineReducers } from 'redux';
import sendEmailReducer from './forgotPassword/forgotPasswordReducer';
import sendPasswordReducer from './forgotPassword/resetPasswordReducer';
import authReducer from './authReducer/authReducer';
import signUpReducer from './signUp/signUpReducer';
import accountVerifyReducer from './verifyAccount/verifyAccountReducer';
import searchFunctionalityReducer from './searchFunctionality/searchFunctionalityReducer';
import articleReducer from './articleReducer/articleReducer';
import homePageArticlesReducer from './homePageArticles/homePageArticlesReducer';
import tagsReducer from './tags/tagsReducer';
import readArticleReducer from './readArticle/readArticleReducer';
import rateArticleReducer from './rateArticle/rateArticleReducer';

const reducers = combineReducers({
  sendEmailReducer,
  sendPasswordReducer,
  auth: authReducer,
  signUpReducer,
  accountVerifyReducer,
  searchFunctionalityReducer,
  article: articleReducer,
  homePageArticlesReducer,
  tagsReducer,
  readArticleReducer,
  rateArticleReducer
});

export default reducers;
