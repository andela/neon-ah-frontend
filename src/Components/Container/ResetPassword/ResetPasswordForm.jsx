import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../View/Header/Header';
import { resetPassword, setMessage } from '../../../action/forgotPassword/forgotPasswordAction';
import MakeHeaderResponsive from '../../View/Header/MakeHeaderResponsive/MakeHeaderResponsive';
import LandingPageHeader from '../../View/Header/LandingPageHeader/LandingPageHeader';
import validatePassword from '../../../utils/emailPasswordValidator';
import formatMessage from '../../View/Message/FormatMessage';
import isTokenValid from '../../../utils/auth/jwtDecode';
import SuccessMessage from '../../View/Message/SuccessMessage';

class ResetPasswordForm extends Component {
  state = {
    isButtonLoading: false
  };

  handleFormSubmit = async event => {
    await this.setState({ isButtonLoading: true });
    event.preventDefault();

    const newPassword = this.newPassword.value;
    const confirmPassword = this.confirmPassword.value;
    const {
      match: {
        params: { token }
      },
      setMessage: setErrorMessage,
      resetPassword: completePasswordReset
    } = this.props;
    const error = validatePassword.password(newPassword);

    if (error) {
      setErrorMessage('failure', error);
      await this.setState({ isButtonLoading: false });
    } else if (newPassword !== confirmPassword) {
      setErrorMessage('failure', 'Password does not match');
      await this.setState({ isButtonLoading: false });
    } else {
      completePasswordReset(newPassword, confirmPassword, token);
    }
  };

  render() {
    const { isButtonLoading } = this.state;
    const {
      message,
      history,
      match: {
        params: { token }
      }
    } = this.props;

    const isValidToken = isTokenValid(token);

    if (!isValidToken) return history.push('/');

    return (
      <div>
        <Header>
          <LandingPageHeader />
          <MakeHeaderResponsive />
        </Header>
        <section>
          {message.type === 'success' ? (
            <div className="reset-form-container">
              <SuccessMessage message={message.value.message} />
            </div>
          ) : (
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
              {isButtonLoading ? (
                <Button loading disabled fluid className="btn--primary" type="submit">
                  Reset Password
                </Button>
              ) : (
                <Button fluid className="btn--primary" type="submit">
                  Reset Password
                </Button>
              )}
            </Form>
          )}
        </section>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]),
  message: PropTypes.oneOfType([PropTypes.object]),
  history: PropTypes.oneOfType([PropTypes.object]),
  setMessage: PropTypes.func,
  resetPassword: PropTypes.func
};

ResetPasswordForm.defaultProps = {
  message: {},
  match: {},
  history: {},
  setMessage: () => {},
  resetPassword: () => {}
};

const mapStateToProps = state => ({
  message: state.sendPasswordReducer.message
});

const mapDispatchToProps = {
  resetPassword,
  setMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordForm);
