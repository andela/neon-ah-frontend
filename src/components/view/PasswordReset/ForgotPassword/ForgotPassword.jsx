/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import ErrorMessage from '../../Message/ErrorMessage';

const ForgotPassword = props => {
  const { onFormSubmit, setEmail, error } = props;
  return (
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
      <Form className="reset-form-container" onSubmit={onFormSubmit}>
        <Form.Field>
          <input onChange={setEmail} ref={input => input && input.focus()} placeholder="Email" type="email" required />
          {error !== '' ? <ErrorMessage message={error} /> : null}
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
  );
};

ForgotPassword.propTypes = {
  error: PropTypes.string,
  onFormSubmit: PropTypes.func,
  setEmail: PropTypes.func
};

export default ForgotPassword;
