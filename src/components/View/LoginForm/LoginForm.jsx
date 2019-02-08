import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { loginLocal, clearLoginErrors } from '../../../action/authActions/authActions';

class Login extends Component {
  dismissLoginErrors = () => {
    const {
      auth: { loginErrors },
      clearErrors
    } = this.props;

    if (loginErrors.length) {
      clearErrors();
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { completeLoginLocal, history } = this.props;

    const userPassword = this.password.value;
    const userEmailOrUsername = this.userEmailOrUsername.value;

    completeLoginLocal({ userEmailOrUsername, userPassword }, history);
  };

  render() {
    const {
      auth: { loginErrors }
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} data-test="LoginForm">
        {loginErrors.length ? <Message negative list={[...loginErrors]} /> : null}
        <Form.Field data-test="LoginFormField">
          <input
            type="text"
            name="user"
            required
            ref={userEmailOrUsername => (this.userEmailOrUsername = userEmailOrUsername)}
            onFocus={this.dismissLoginErrors}
            placeholder="Email or username"
          />
        </Form.Field>
        <Form.Field data-test="LoginFormField">
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
            ref={password => (this.password = password)}
            onFocus={this.dismissLoginErrors}
          />
        </Form.Field>
        <Button style={{ backgroundColor: '#2fb5ee', color: '#fff' }} fluid content="Login" id="loginButton" />
      </Form>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  completeLoginLocal: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  completeLoginLocal: (userInfo, history) => dispatch(loginLocal(userInfo, history)),
  clearErrors: () => dispatch(clearLoginErrors())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
