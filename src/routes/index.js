import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import LandingPage from '../components/view/LandingPage/LandingPage';
import NotFound from '../components/view/NotFound/NotFound';
import ForgotPasswordForm from '../components/Container/ForgotPassword/ForgotPasswordForm';
import ResetPasswordForm from '../components/Container/ResetPassword/ResetPasswordForm';

export default (
  // eslint-disable-next-line react/jsx-filename-extension
  <Router>
    <>
      <Switch>
        <Route path="/reset-password/:token" component={ResetPasswordForm} />
        <Route path="/forgot-password" component={ForgotPasswordForm} exact />
        <Route path="/" component={LandingPage} exact />
        <Route component={NotFound} />
      </Switch>
    </>
  </Router>
);
