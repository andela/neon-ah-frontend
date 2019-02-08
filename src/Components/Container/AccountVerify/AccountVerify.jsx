import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './AccountVerify.scss';
import Header from '../../View/Header/Header';
import * as EmailVerificationActions from '../../../action/emailVerification/emailVerificationAction';
import isTokenValid from '../../../utils/auth/jwtDecode';

class AccountVerify extends Component {
  state = {};

  componentDidMount() {
    const {
      verifyUser,
      history,
      match: {
        params: { token }
      }
    } = this.props;
    verifyUser(token, history);
  }

  render() {
    const {
      history,
      match: {
        params: { token }
      }
    } = this.props;
    const isValidToken = isTokenValid(token);
    if (!isValidToken) {
      history.push('/');
    }
    return (
      <>
        <Header />
        <div className="account-verify-container">
          <Loader active inline="centered" size="massive" />
          <div className="align-center">Verifying your account</div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const {
    accountVerifyReducer: { statusCode }
  } = state;
  return {
    statusCode
  };
};

const mapDispatchToProps = {
  verifyUser: EmailVerificationActions.verifyUserApiCall
};

AccountVerify.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.node
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountVerify);
