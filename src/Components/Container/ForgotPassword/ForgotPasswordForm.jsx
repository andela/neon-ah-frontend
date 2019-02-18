/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import Header from '../../View/Header/Header';
import MakeHeaderResponsive from '../../View/Header/MakeHeaderResponsive/MakeHeaderResponsive';
import LandingPageHeader from '../../View/Header/LandingPageHeader/LandingPageHeader';
import EmailSent from '../../View/PasswordReset/EmailSent/EmailSent';
import { forgetPasswordRequest, onEmailSubmit } from '../../../action/forgotPassword/forgotPasswordAction';
import validateEmail from '../../../utils/emailPasswordValidator';
import ErrorMessage from '../../View/Message/ErrorMessage';

class ForgotPasswordForm extends Component {
  state = {
    message: '',
    isButtonLoading: false
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState(prevState => ({ ...prevState, isButtonLoading: !prevState.isButtonLoading }));
    const { forgetPasswordRequest: sendPasswordRecoveryEmail } = this.props;
    const userEmail = this.userEmail.value;
    const error = validateEmail.email(userEmail);
    if (error) {
      this.setState(prevState => ({
        ...prevState,
        ...{ message: error, isButtonLoading: !prevState.isButtonLoading }
      }));
      return;
    }
    sendPasswordRecoveryEmail(userEmail);
  };

  render() {
    const { isEmailSent, onEmailSubmit: sendPasswordRecoveryEmail } = this.props;
    const { message, isButtonLoading } = this.state;
    return (
      <div>
        <Header>
          <LandingPageHeader />
          <MakeHeaderResponsive />
        </Header>
        <section>
          {isEmailSent ? (
            <EmailSent
              resetButtonState={() =>
                this.setState(prevState => ({ ...prevState, isButtonLoading: false, message: '' }))
              }
              onFormSubmit={() => sendPasswordRecoveryEmail()}
            />
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
                {isButtonLoading ? (
                  <Button disabled loading fluid className="btn--primary" type="submit">
                    Submit
                  </Button>
                ) : (
                  <Button fluid className="btn--primary" type="submit">
                    Submit
                  </Button>
                )}
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
  forgetPasswordRequest,
  onEmailSubmit
};

ForgotPasswordForm.propTypes = {
  onEmailSubmit: PropTypes.func.isRequired,
  forgetPasswordRequest: PropTypes.func.isRequired,
  isEmailSent: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordForm);
