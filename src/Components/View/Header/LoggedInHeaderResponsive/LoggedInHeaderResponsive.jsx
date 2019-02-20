/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

const LoggedInHeaderResponsive = () => {
  return (
    <div className="hamburger">
      <Dropdown item icon="bars">
        <Dropdown.Menu>
          <Dropdown.Item text={<Link to="/search">Search</Link>} />
          <Dropdown.Item text={<Link to="/articles/create">Write Article</Link>} />
          <Dropdown.Item text={<a href=" ">Notifications</a>} />
          <Dropdown.Item text={<Link to="/profile">Profile</Link>} />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export default LoggedInHeaderResponsive;
