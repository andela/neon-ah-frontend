import React from 'react';
import ErrorMessage from './ErrorMessage';

const formatMessage = message => {
  switch (message.type) {
    case 'failure':
      return <ErrorMessage message={message.value} />;
    default:
      return null;
  }
};

export default formatMessage;
