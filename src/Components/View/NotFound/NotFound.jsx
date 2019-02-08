import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../Header/Header';

const NotFound = () => {
  return (
    <>
      <Helmet title="Page Not Found - Authors Haven" />
      <Header />
      <section>
        <div className="reset-password-container">
          <div className="align-center">
            <img
              src="https://res.cloudinary.com/jesseinit/image/upload/v1550219255/neon-ah/404.svg"
              alt="password reset"
              style={{ width: '400px', height: '400px' }}
            />
            <h2>Sorry the page you have requested cannot be found.</h2>
            <Link to="/">Go Home</Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default NotFound;
