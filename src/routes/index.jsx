import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import NotFound from '../Components/View/NotFound/NotFound';
import ForgotPasswordForm from '../Components/Container/ForgotPassword/ForgotPasswordForm';
import ResetPasswordForm from '../Components/Container/ResetPassword/ResetPasswordForm';
import SocialAuthHandler from '../Components/View/SocialAuthHandler/SocialAuthHandler';
import EmailConfirmation from '../Components/Container/EmailVerification/EmailVerification';
import AccountVerify from '../Components/Container/AccountVerify/AccountVerify';
import ConfirmPage from '../Components/View/ConfirmationPage/ConfirmationPage';
import SearchFunctionality from '../Components/Container/SearchFunctionality/SearchFunctionality';
import CreateArticleDefault from '../Components/View/CreateArticle/CreateArticle';
import AuthenticatedRoute from '../Components/Container/ProtectedRoute/ProtectedRoute';
import SingleArticle from '../Components/Container/SingleArticle/SingleArticle';
import Home from '../Components/Container/Home/Home';
import ProfilePage from '../Components/Container/ProfilePage/ProfilePage';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/search" component={SearchFunctionality} exact />
      <Route path="/reset-password/:token" component={ResetPasswordForm} />
      <Route path="/forgot-password" component={ForgotPasswordForm} exact />
      <Route path="/" component={Home} exact />
      <Route path="/auth/social" component={SocialAuthHandler} exact />
      <Route path="/auth/verify/:token" component={AccountVerify} />
      <Route path="/resend-verification" component={EmailConfirmation} />
      <AuthenticatedRoute path="/article/new" component={CreateArticleDefault} exact />
      <Route path="/confirmation" exact component={ConfirmPage} />
      <Route path="/articles/read/:slug" component={SingleArticle} />
      <Route path="/profile/:username" component={ProfilePage} exact />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
