import React from "react";
import ReactDOM from "react-dom";
import logo from '../public/images/logo.png';
import sign from '../public/images/welcome.svg';
import styles from './index.css';
const h1 = {
    color: 'rgba(0, 0, 0, 1)',
    padding: '10px',
    textAlign: 'center'
}

const Index = () => {
    return <div>

        <img src={sign} alt="welcome" className={styles.welcome} />
        <h1 style={h1}>
            to
        </h1>
        <img src={logo} alt="Logo" />
    </div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));
