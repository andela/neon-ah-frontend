/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export class ConfirmationPage extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.location.replace('/');
    }, 700);
  }

  render() {
    return (
      <div className="confirmation-div">
        <Message color="blue">You have been successfully verified, you will be redirected in 2 secs</Message>
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(ConfirmationPage);
