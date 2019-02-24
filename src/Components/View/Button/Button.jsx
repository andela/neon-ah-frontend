import React from 'react';

const Button = props => {
  const { className, id, type, content, onClick } = props;
  return (
    <button className={className} id={id} type={type} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
