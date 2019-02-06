import React from "react";
import { connect } from 'react-redux';
import logo from '../public/images/logo.png';
import  simpleAction  from './action/testRedux';
import sign from '../public/images/welcome.svg';
import styles from './index.css';
import './styles.scss';

const Index = () => {
    return <div className="container">
        <img src={sign} alt="welcome" className={styles.welcome} />
            <h1>to</h1>
        <img src={logo} alt="Logo" />
    </div>;
};

export default connect(null, simpleAction)(Index);
