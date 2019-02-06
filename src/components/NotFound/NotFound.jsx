import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1>Oops looks like you are lost</h1>
      <Link to="/">Go Home</Link>
    </>
  );
};

export default NotFound;
