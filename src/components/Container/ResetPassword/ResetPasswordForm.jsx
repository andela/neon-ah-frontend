import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../view/Header/Header';
import PropTypes from 'prop-types';
import * as forgotPasswordActions from '../../../action/forgotPassword/forgotPassword.action';
import MakeHeaderResponsive from '../../view/Header/MakeHeaderResponsive/MakeHeaderResponsive';
import LandingPageHeader from '../../view/Header/LandingPageHeader/LandingPageHeader';
import { Form, Button } from 'semantic-ui-react';
import './ResetPasswordForm.scss';
import validatePassword from '../../../utils/emailPasswordValidator';
import formatMessage from '../../view/Message/FormatMessage';
import { withRouter } from 'react-router-dom';
import isTokenValid from '../../../utils/auth/jwtDecode';

class ResetPasswordForm extends Component {
  handleFormSubmit = event => {
    event.preventDefault();
    const newPassword = this.newPassword.value;
    const confirmPassword = this.confirmPassword.value;
    const {
      match: {
        params: { token }
      }
    } = this.props;
    const error = validatePassword.password(newPassword);
    if (error) {
      this.props.setMessage('failure', error);
    } else if (newPassword !== confirmPassword) {
      this.props.setMessage('failure', 'Password dont match');
    } else {
      this.props.onPasswordSubmit(newPassword, confirmPassword, token);
    }
  };

  render() {
    const {
      message,
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
      <div>
        <Header>
          <LandingPageHeader />
          <MakeHeaderResponsive />
        </Header>
        <section>
          <Form className="reset-form-container" onSubmit={this.handleFormSubmit}>
            <h3 className="align-center">Kindly enter a new password</h3>
            <Form.Field>
              <input ref={input => (this.newPassword = input)} placeholder="New Password" type="password" required />
            </Form.Field>
            <Form.Field>
              <input
                ref={input => (this.confirmPassword = input)}
                placeholder="Confirm New Password"
                type="password"
                required
              />
            </Form.Field>
            {formatMessage(message)}
            <Button fluid className="btn--primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  message: state.sendPasswordReducer.message
});

const mapDispatchToProps = {
  onPasswordSubmit: forgotPasswordActions.asyncResetPasswordApiCall,
  setMessage: forgotPasswordActions.setMessage
};

ResetPasswordForm.propTypes = {
  getNewPassword: PropTypes.string,
  getConfirmPassword: PropTypes.string,
  errorMessage: PropTypes.string,
  newPassword: PropTypes.string,
  confirmPassword: PropTypes.string,
  onFormSubmit: PropTypes.func,
  successMessage: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordForm);
