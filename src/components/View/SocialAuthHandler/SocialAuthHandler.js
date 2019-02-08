import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginSocial, loginError } from '../../../action/authActions/authActions';

class SocialAuthHandler extends Component {
  componentDidMount() {
    const { history, location, authError, completeSocialAuth } = this.props;

    const urlParams = new URLSearchParams(location.search);

    if (!urlParams.get('error') && !urlParams.get('token')) return history.push('/');

    if (urlParams.get('error')) {
      authError('Cannot authencate this social account.');
      return history.push('/');
    }

    const token = urlParams.get('token');

    return completeSocialAuth(history, token);
  }

  render() {
    return <></>;
  }
}

SocialAuthHandler.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  authError: PropTypes.func.isRequired,
  completeSocialAuth: PropTypes.func.isRequired
};

SocialAuthHandler.defaultProps = {};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapActionsToProps = {
  completeSocialAuth: loginSocial,
  authError: loginError
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SocialAuthHandler);
