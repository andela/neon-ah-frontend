/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import LandingPage from '../components/View/LandingPage/LandingPage';
import NotFound from '../components/View/NotFound/NotFound';

import ForgotPasswordForm from '../components/Container/ForgotPassword/ForgotPasswordForm';
import ResetPasswordForm from '../components/Container/ResetPassword/ResetPasswordForm';
import SocialAuthHandler from '../components/View/SocialAuthHandler/SocialAuthHandler';

export default (
  <Router>
    <>
      <Switch>
        <Route path="/reset-password/:token" component={ResetPasswordForm} />
        <Route path="/forgot-password" component={ForgotPasswordForm} exact />
        <Route path="/" component={LandingPage} exact />
        <Route path="/auth/social" component={SocialAuthHandler} exact />
        <Route component={NotFound} />
      </Switch>
    </>
  </Router>
);
