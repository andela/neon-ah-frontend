/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../view/Header/Header';
import MakeHeaderResponsive from '../../view/Header/MakeHeaderResponsive/MakeHeaderResponsive';
import LandingPageHeader from '../../view/Header/LandingPageHeader/LandingPageHeader';
import './ForgotPasswordForm.scss';
import EmailSent from '../../view/PasswordReset/EmailSent/EmailSent';
import * as forgotPasswordActions from '../../../action/forgotPassword/forgotPassword.action';
import { Form, Button } from 'semantic-ui-react';
import validateEmail from '../../../utils/emailPasswordValidator';
import ErrorMessage from '../../view/Message/ErrorMessage';

class ForgotPasswordForm extends Component {
  state = {
    message: ''
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const userEmail = this.userEmail.value;
    const error = validateEmail.email(userEmail);
    if (error) {
      this.setState({ ...this.state, message: error });
    }
    this.props.sendUserEmail(userEmail);
  };

  render() {
    const { isEmailSent, onEmailSubmit } = this.props;
    const { message } = this.state;
    return (
      <div>
        <Header>
          <LandingPageHeader />
          <MakeHeaderResponsive />
        </Header>
        <section>
          {isEmailSent ? (
            <EmailSent onFormSubmit={() => onEmailSubmit()} />
          ) : (
            <div className="reset-password-container">
              <div className="align-center">
                <img
                  src="https://res.cloudinary.com/jesseinit/image/upload/v1549618838/neon-ah/forgot_password.svg"
                  alt="password reset"
                  style={{ width: '261px', height: '190px' }}
                />
                <h2>Forgot Password?</h2>
                <p>Enter your email here and we will send a link to reset your password</p>
              </div>
              <Form className="reset-form-container" onSubmit={this.handleFormSubmit}>
                <Form.Field>
                  <input ref={input => (this.userEmail = input)} placeholder="Email" type="email" required />
                  {message !== '' ? <ErrorMessage message={message} /> : null}
                </Form.Field>
                <Button fluid className="btn--primary" type="submit">
                  Submit
                </Button>
              </Form>
              <div className="align-center">
                <p>
                  Dont have an account?
                  <span className="btn--default"> Sign Up</span>
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    sendEmailReducer: { isEmailSent }
  } = state;
  return {
    isEmailSent
  };
};

const mapDispatchToProps = {
  sendUserEmail: forgotPasswordActions.asyncForgotPasswordApiCall,
  onEmailSubmit: forgotPasswordActions.onEmailSubmit
};

ForgotPasswordForm.propTypes = {
  errorMessage: PropTypes.string,
  email: PropTypes.string,
  isEmailSent: PropTypes.bool,
  onFormSubmit: PropTypes.func,
  setEmail: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordForm);
