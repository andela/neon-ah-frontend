import React from "react";
import ReactDOM from "react-dom";
import Index from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
      <Index />
	</Provider>
,document.getElementById("index"));
