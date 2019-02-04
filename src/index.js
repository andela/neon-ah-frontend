import React from "react";
import ReactDOM from "react-dom";
import logo from '../public/images/logo.png'

const Index = () => {
    return <div>
        <h1>
            Welcome to Author's Haven!
        </h1>
        <img src={logo} alt="Logo" />
    </div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));
