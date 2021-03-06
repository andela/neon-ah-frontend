import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

const MakeHeaderResponsive = props => {
  return (
    <div className="hamburger">
      <Dropdown item icon="bars">
        <Dropdown.Menu>
          <Dropdown.Item text={<Link to="/search">Search</Link>} />
          <Dropdown.Item text={<Link to="/login">Login</Link>} />
          <Dropdown.Item text={<Link to="/signup">SignUp</Link>} />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export default MakeHeaderResponsive;
