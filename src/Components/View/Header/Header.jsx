import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children }) => {
  return (
    <div className="header">
      <div className="ui container">
        <div className="header__container">
          <div>
            <a href="/">
              <img
                src="https://res.cloudinary.com/jesseinit/image/upload/v1549829243/neon-ah/Logo.svg"
                alt="Authors haven logo"
                className="logo"
              />
            </a>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
