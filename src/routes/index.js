import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage.jsx';
import NotFound from '../components/NotFound/NotFound.jsx';

export default (
  <BrowserRouter>
    <>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route component={NotFound} />
      </Switch>
    </>
  </BrowserRouter>
);
