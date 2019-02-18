import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import NotFound from '../Components/View/NotFound/NotFound';
import ForgotPasswordForm from '../Components/Container/ForgotPassword/ForgotPasswordForm';
import ResetPasswordForm from '../Components/Container/ResetPassword/ResetPasswordForm';
import SocialAuthHandler from '../Components/View/SocialAuthHandler/SocialAuthHandler';
import EmailConfirmation from '../Components/Container/EmailVerification/EmailVerification';
import AccountVerify from '../Components/Container/AccountVerify/AccountVerify';
import Articles from '../Components/Container/Articles/Articles';
import ConfirmPage from '../Components/View/ConfirmationPage/ConfirmationPage';
import SearchFunctionality from '../Components/Container/SearchFunctionality/SearchFunctionality';

export default (
  <Router>
    <>
      <Switch>
        <Route path="/search" component={SearchFunctionality} exact />
        <Route path="/reset-password/:token" component={ResetPasswordForm} exact />
        <Route path="/forgot-password" component={ForgotPasswordForm} exact />
        <Route path="/" component={Articles} exact />
        <Route path="/auth/social" component={SocialAuthHandler} exact />
        <Route path="/auth/verify/:token" component={AccountVerify} />
        <Route path="/resend-verification" component={EmailConfirmation} />
        <Route path="/confirmation" exact component={ConfirmPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  </Router>
);
