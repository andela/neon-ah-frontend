import React from 'react';
import { connect } from 'react-redux';
import logo from '../../../public/images/logo.png';
import simpleAction from '../../action/testRedux';
import sign from '../../../public/images/welcome.svg';
import styles from './LandingPage.css';

const h1 = {
	color: 'rgba(0, 0, 0, 1)',
	padding: '10px',
	textAlign: 'center'
};

const LandingPage = () => {
	return (
		<div>
			<img src={sign} alt="welcome" className={styles.welcome} />
			<h1 style={h1}>to</h1>
			<img src={logo} alt="Logo" />
		</div>
	);
};

export default connect(
	null,
	simpleAction
)(LandingPage);
