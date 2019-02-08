import React from 'react';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

const formatMessage = message => {
  switch (message.type) {
    case 'success':
      return <SuccessMessage message={message.value} />;
    case 'failure':
      return <ErrorMessage message={message.value} />;
    default:
      return null;
  }
};

export default formatMessage;
