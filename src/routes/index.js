import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from '../components/view/LandingPage/LandingPage';
import NotFound from '../components/view/NotFound/NotFound.jsx';

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
