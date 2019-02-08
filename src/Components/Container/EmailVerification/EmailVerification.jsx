import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as EmailVerificationActions from '../../../action/emailVerification/emailVerificationAction';
import * as forgotPasswordActions from '../../../action/forgotPassword/forgotPasswordAction';
import './EmailVerification.scss';
import Header from '../../View/Header/Header';
import ErrorMessage from '../../View/Message/ErrorMessage';

class EmailVerification extends Component {
  state = {
    message: '',
    isButtonLoading: false
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.setState(prevState => ({ ...prevState, isButtonLoading: !prevState.isButtonLoading }));
    const { sendUserEmail } = this.props;
    const userEmail = this.userEmail.value;
    sendUserEmail(userEmail);
  };

  render() {
    const { message, isButtonLoading } = this.state;
    const { isEmailSent, onEmailSubmit } = this.props;
    return (
      <>
        <Header />
        {isEmailSent ? (
          <div className="email-confirmation-container">
            <div className="align-center">
              <img
                src="https://res.cloudinary.com/jesseinit/image/upload/v1549618838/neon-ah/mail.svg"
                alt="email sent"
                style={{ width: '261px', height: '190px' }}
              />
              <h2>Email Sent</h2>
              <p>Head over to your mailbox to get your verification link.</p>
              <button
                type="submit"
                className="btn--default"
                onMouseEnter={() => this.setState(prevState => ({ ...prevState, isButtonLoading: false, message: '' }))}
                onClick={() => onEmailSubmit()}
              >
                Didn’t recieve any email?
              </button>
            </div>
          </div>
        ) : (
          <div className="email-confirmation-container">
            <div className="align-center">
              <img
                src="https://res.cloudinary.com/jesseinit/image/upload/v1550139642/neon-ah/authentication.svg"
                alt="email confirmation"
                style={{ width: '261px', height: '190px' }}
              />
              <h2>Account verification</h2>
              <p>Kindly enter your email here and we will send a verification link</p>
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
          </div>
        )}
      </>
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
  sendUserEmail: EmailVerificationActions.sendConfirmationMailApiCall,
  onEmailSubmit: forgotPasswordActions.onEmailSubmit
};

EmailVerification.propTypes = {
  onEmailSubmit: PropTypes.func.isRequired,
  isEmailSent: PropTypes.bool,
  sendUserEmail: PropTypes.func.isRequired
};

EmailVerification.defaultProps = {
  isEmailSent: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerification);
