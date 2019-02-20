import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

ProtectedRoute.defaultProps = {
  component: null,
  isAuthenticated: false
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(ProtectedRoute);
