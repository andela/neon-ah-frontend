import React from 'react';
import './Button.scss';

const Button = props => {
  const { className, id, type, content, onClick, icon, iconAlt } = props;
  return (
    <button className={className} id={id} type={type || 'button'} onClick={onClick}>
      {icon ? <img width="30px" height="30px" src={icon} alt={iconAlt} /> : null}
      {content}
    </button>
  );
};

export default Button;
