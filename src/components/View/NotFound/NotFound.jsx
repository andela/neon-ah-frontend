import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import MakeHeaderResponsive from '../Header/MakeHeaderResponsive/MakeHeaderResponsive';
import LandingPageHeader from '../Header/LandingPageHeader/LandingPageHeader';

const NotFound = () => {
  return (
    <>
      <Header>
        <LandingPageHeader />
        <MakeHeaderResponsive />
      </Header>
      <section>
        <div className="reset-password-container">
          <div className="align-center">
            <img
              src="https://res.cloudinary.com/jesseinit/image/upload/v1550219255/neon-ah/404.svg"
              alt="password reset"
              style={{ width: '400px', height: '400px' }}
            />
            <h2>Oops, looks like you are lost</h2>
            <Link to="/">Go Home</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
