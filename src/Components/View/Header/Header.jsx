import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children }) => {
  return (
    <div className="header">
      <div className="ui container">
        <div className="header__container">
          <div>
            <img src={logo} alt="Authors haven logo" className="logo" />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
