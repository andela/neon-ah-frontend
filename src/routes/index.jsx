/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import LandingPage from '../Components/View/LandingPage/LandingPage';
import NotFound from '../Components/View/NotFound/NotFound';
import ForgotPasswordForm from '../Components/Container/ForgotPassword/ForgotPasswordForm';
import ResetPasswordForm from '../Components/Container/ResetPassword/ResetPasswordForm';
import SocialAuthHandler from '../Components/View/SocialAuthHandler/SocialAuthHandler';
import EmailConfirmation from '../Components/Container/EmailVerification/EmailVerification';
import AccountVerify from '../Components/Container/AccountVerify/AccountVerify';

export default (
  <Router>
    <>
      <Switch>
        <Route path="/reset-password/:token" component={ResetPasswordForm} />
        <Route path="/forgot-password" component={ForgotPasswordForm} exact />
        <Route path="/" component={LandingPage} exact />
        <Route path="/auth/social" component={SocialAuthHandler} exact />
        <Route path="/auth/verify/:token" component={AccountVerify} />
        <Route path="/resend-verification" component={EmailConfirmation} />
        <Route component={NotFound} />
      </Switch>
    </>
  </Router>
);
