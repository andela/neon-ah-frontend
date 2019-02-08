/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const EmailSent = ({ onFormSubmit }) => {
  return (
    <div className="reset-password-container">
      <div className="align-center">
        <img
          src="https://res.cloudinary.com/jesseinit/image/upload/v1549618838/neon-ah/mail.svg"
          alt="password reset"
          style={{ width: '261px', height: '190px' }}
        />
        <h2>Email Sent</h2>
        <p>Head over to your mailbox to get your reset link and create your brand new password.</p>
        <button type="submit" className="btn--default" onClick={onFormSubmit}>
          Didn’t recieve any email?
        </button>
      </div>
    </div>
  );
};

EmailSent.propTypes = {
  onFormSubmit: PropTypes.func
};

export default EmailSent;
