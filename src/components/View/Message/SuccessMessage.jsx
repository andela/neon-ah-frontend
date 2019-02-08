import React from 'react';

const SuccessMessage = ({ message }) => {
  return (
    <div className="ui positive message">
      <div className="header">{message}</div>
    </div>
  );
};

export default SuccessMessage;
